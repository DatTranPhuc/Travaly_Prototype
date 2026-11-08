// Extract the user's original poses by connected alpha regions, not equal grid crops.
// No image generation, redrawing, background replacement, or new artwork.
import AppKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
let root=URL(fileURLWithPath:FileManager.default.currentDirectoryPath)
let output=root.appendingPathComponent("public/images/lumi-guides")
let anchors:[String:[CGPoint]]=["a":[CGPoint(x:285,y:285),CGPoint(x:740,y:290),CGPoint(x:1245,y:280),CGPoint(x:255,y:750),CGPoint(x:710,y:770),CGPoint(x:1230,y:770)],"b":[CGPoint(x:280,y:260),CGPoint(x:715,y:300),CGPoint(x:1250,y:260),CGPoint(x:260,y:760),CGPoint(x:710,y:760),CGPoint(x:1260,y:760)]]
for sheet in (CommandLine.arguments.count>1 ? Array(CommandLine.arguments.dropFirst()) : ["a","b"]) {
 let source=output.appendingPathComponent("poses-\(sheet).png")
 let cg=NSImage(contentsOf:source)!.cgImage(forProposedRect:nil,context:nil,hints:nil)!
 let w=cg.width,h=cg.height
 var pixels=[UInt8](repeating:0,count:w*h*4)
 let info=CGImageAlphaInfo.premultipliedLast.rawValue
 let context=CGContext(data:&pixels,width:w,height:h,bitsPerComponent:8,bytesPerRow:w*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:info)!
 context.draw(cg,in:CGRect(x:0,y:0,width:w,height:h))
 var seen=[Bool](repeating:false,count:w*h)
 var owners=[Int](repeating:-1,count:w*h)
 var masks=Array(repeating:[Int](),count:6)
 for i in 0..<w*h where !seen[i] && pixels[i*4+3]>12 {
  var queue=[i];seen[i]=true;var head=0;var x0=w,y0=h,x1=0,y1=0
  while head<queue.count {
   let p=queue[head];head+=1;let x=p%w,y=p/w
   x0=min(x0,x);y0=min(y0,y);x1=max(x1,x);y1=max(y1,y)
   for (dx,dy) in [(-1,0),(1,0),(0,-1),(0,1)] {
    let xx=x+dx,yy=y+dy
    if xx>=0&&xx<w&&yy>=0&&yy<h {let j=yy*w+xx;if !seen[j]&&pixels[j*4+3]>12{seen[j]=true;queue.append(j)}}
   }
  }
  if queue.count<8 {continue}
  let center=CGPoint(x:Double(x0+x1)/2,y:Double(y0+y1)/2)
  let row=y0>=490 ? 1 : 0
  var owner=anchors[sheet]!.enumerated().filter{$0.offset/3 == row}.min { a,b in
   hypot(a.element.x-center.x,a.element.y-center.y)<hypot(b.element.x-center.x,b.element.y-center.y)
  }!.offset
  // Small detached lightbulb rays belong to the idea pose, not the adjacent megaphone.
  if sheet=="a" && queue.count<1500 && x0>=820 && x1<=1005 && y0>=490 && y1<=635 {owner=4}
  for p in queue {owners[p]=owner};masks[owner].append(contentsOf:queue)
 }
 for owner in 0..<6 {
  // Retain the original antialiased edges around each alpha component.
  var included=Set<Int>()
  for p in masks[owner] {let x=p%w,y=p/w
   for dy in -4...4 {for dx in -4...4 {let xx=x+dx,yy=y+dy
    if xx>=0&&xx<w&&yy>=0&&yy<h {let j=yy*w+xx;if (owners[j] == -1 || owners[j] == owner)&&pixels[j*4+3]>0 {included.insert(j)}}
   }}
  }
  let x0=included.map{$0%w}.min()!,x1=included.map{$0%w}.max()!
  let y0=included.map{$0/w}.min()!,y1=included.map{$0/w}.max()!
  let cw=x1-x0+1,ch=y1-y0+1
  var cropped=[UInt8](repeating:0,count:cw*ch*4)
  for p in included {let x=p%w-x0,y=p/w-y0;let to=(y*cw+x)*4
   for c in 0..<4 {cropped[to+c]=pixels[p*4+c]}
  }
  let cropContext=CGContext(data:&cropped,width:cw,height:ch,bitsPerComponent:8,bytesPerRow:cw*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:info)!
  let size=512,padding=28.0,scale=(Double(size)-2*padding)/Double(max(cw,ch))
  let canvas=CGContext(data:nil,width:size,height:size,bitsPerComponent:8,bytesPerRow:size*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:info)!
  canvas.interpolationQuality = .high
  let dw=Double(cw)*scale,dh=Double(ch)*scale
  canvas.draw(cropContext.makeImage()!,in:CGRect(x:(Double(size)-dw)/2,y:(Double(size)-dh)/2,width:dw,height:dh))
  let url=output.appendingPathComponent("pose-\(sheet)-\(owner).png")
  let dest=CGImageDestinationCreateWithURL(url as CFURL,UTType.png.identifier as CFString,1,nil)!
  CGImageDestinationAddImage(dest,canvas.makeImage()!,nil);CGImageDestinationFinalize(dest)
  print(url.lastPathComponent,"source bounds",x0,y0,cw,ch)
 }
}
