using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections.Generic;

public class MascotExtractor {
    public static void Process() {
        string imgA = @"C:/Users/datph/.gemini/antigravity/brain/927ced6f-b26a-437d-8d48-c157b03a3848/.user_uploaded/media_1794194499352_c31528ff.png";
        string imgB = @"C:/Users/datph/.gemini/antigravity/brain/927ced6f-b26a-437d-8d48-c157b03a3848/.user_uploaded/media_1794194518310_1c855e92.png";
        
        string outDir = Path.GetFullPath(@"public/images/lumi-guides");
        string imgDir = Path.GetFullPath(@"public/images");
        Directory.CreateDirectory(outDir);
        Directory.CreateDirectory(imgDir);

        // Anchors for 6 poses in 1024x682
        // Row 0: cols 0, 1, 2. Row 1: cols 0, 1, 2
        Point[] anchorsA = new Point[] {
            new Point(190, 190), // 0: tour sunglasses
            new Point(495, 195), // 1: map wink
            new Point(830, 185), // 2: safari hat backpack
            new Point(170, 500), // 3: non la
            new Point(470, 510), // 4: star cape lightbulb
            new Point(820, 510)  // 5: glasses megaphone
        };

        Point[] anchorsB = new Point[] {
            new Point(190, 175), // 0: big pin map
            new Point(480, 200), // 1: lying laptop
            new Point(835, 175), // 2: non la route board
            new Point(175, 510), // 3: running backpack
            new Point(475, 510), // 4: cape rock flag
            new Point(840, 510)  // 5: chair reading globe
        };

        ExtractSheet("a", imgA, anchorsA, outDir, imgDir);
        ExtractSheet("b", imgB, anchorsB, outDir, imgDir);

        Console.WriteLine("Extraction complete!");
    }

    private static void ExtractSheet(string sheetName, string srcPath, Point[] anchors, string outDir, string imgDir) {
        using (Bitmap srcBmp = new Bitmap(srcPath)) {
            int w = srcBmp.Width;
            int h = srcBmp.Height;

            BitmapData data = srcBmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            byte[] bytes = new byte[w * h * 4];
            System.Runtime.InteropServices.Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);
            srcBmp.UnlockBits(data);

            bool[] visited = new bool[w * h];
            int[] pixelOwner = new int[w * h];
            for (int i = 0; i < pixelOwner.Length; i++) pixelOwner[i] = -1;

            List<List<int>> mascotPixels = new List<List<int>>();
            for (int i = 0; i < 6; i++) mascotPixels.Add(new List<int>());

            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    int idx = y * w + x;
                    if (visited[idx]) continue;
                    byte alpha = bytes[idx * 4 + 3];
                    if (alpha < 10) continue;

                    // BFS connected component
                    List<int> comp = new List<int>();
                    int minX = x, maxX = x, minY = y, maxY = y;
                    Queue<int> q = new Queue<int>();
                    q.Enqueue(idx);
                    visited[idx] = true;

                    while (q.Count > 0) {
                        int curr = q.Dequeue();
                        comp.Add(curr);
                        int cx = curr % w;
                        int cy = curr / w;

                        if (cx < minX) minX = cx;
                        if (cx > maxX) maxX = cx;
                        if (cy < minY) minY = cy;
                        if (cy > maxY) maxY = cy;

                        int[] dxs = {-1, 1, 0, 0, -1, 1, -1, 1};
                        int[] dys = {0, 0, -1, 1, -1, -1, 1, 1};

                        for (int d = 0; d < 8; d++) {
                            int nx = cx + dxs[d];
                            int ny = cy + dys[d];
                            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                                int nidx = ny * w + nx;
                                if (!visited[nidx] && bytes[nidx * 4 + 3] >= 10) {
                                    visited[nidx] = true;
                                    q.Enqueue(nidx);
                                }
                            }
                        }
                    }

                    if (comp.Count < 4) continue; // Noise

                    double centerX = (minX + maxX) / 2.0;
                    double centerY = (minY + maxY) / 2.0;
                    int row = (centerY >= 325) ? 1 : 0;

                    int owner = row * 3;
                    double bestDist = double.MaxValue;

                    for (int o = row * 3; o < row * 3 + 3; o++) {
                        double dist = Math.Sqrt(Math.Pow(anchors[o].X - centerX, 2) + Math.Pow(anchors[o].Y - centerY, 2));
                        if (dist < bestDist) {
                            bestDist = dist;
                            owner = o;
                        }
                    }

                    // Special rule for Sheet A: Lightbulb and its rays belong to pose 4 (Cape + Lightbulb), not pose 5 (Megaphone)
                    if (sheetName == "a" && minX >= 530 && maxX <= 670 && minY >= 320 && maxY <= 440) {
                        owner = 4;
                    }

                    // Special rule for Sheet A: stars near pose 4
                    if (sheetName == "a" && minX >= 310 && maxX <= 380 && minY >= 400 && maxY <= 510) {
                        owner = 4;
                    }
                    if (sheetName == "a" && minX >= 580 && maxX <= 640 && minY >= 520 && maxY <= 600) {
                        owner = 4;
                    }

                    foreach (int p in comp) {
                        pixelOwner[p] = owner;
                        mascotPixels[owner].Add(p);
                    }
                }
            }

            // Expand border by 2px around each component to preserve anti-aliasing smooth edge
            for (int o = 0; o < 6; o++) {
                HashSet<int> finalSet = new HashSet<int>(mascotPixels[o]);
                foreach (int p in mascotPixels[o]) {
                    int px = p % w;
                    int py = p / w;
                    for (int dy = -2; dy <= 2; dy++) {
                        for (int dx = -2; dx <= 2; dx++) {
                            int nx = px + dx;
                            int ny = py + dy;
                            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                                int nidx = ny * w + nx;
                                if ((pixelOwner[nidx] == -1 || pixelOwner[nidx] == o) && bytes[nidx * 4 + 3] > 0) {
                                    finalSet.Add(nidx);
                                }
                            }
                        }
                    }
                }

                if (finalSet.Count == 0) continue;

                int bMinX = w, bMaxX = 0, bMinY = h, bMaxY = 0;
                foreach (int p in finalSet) {
                    int px = p % w;
                    int py = p / w;
                    if (px < bMinX) bMinX = px;
                    if (px > bMaxX) bMaxX = px;
                    if (py < bMinY) bMinY = py;
                    if (py > bMaxY) bMaxY = py;
                }

                int cropW = bMaxX - bMinX + 1;
                int cropH = bMaxY - bMinY + 1;

                using (Bitmap cropBmp = new Bitmap(cropW, cropH, PixelFormat.Format32bppArgb)) {
                    BitmapData cropData = cropBmp.LockBits(new Rectangle(0, 0, cropW, cropH), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                    byte[] cropBytes = new byte[cropW * cropH * 4];

                    foreach (int p in finalSet) {
                        int px = p % w - bMinX;
                        int py = p / w - bMinY;
                        int dstIdx = (py * cropW + px) * 4;
                        cropBytes[dstIdx] = bytes[p * 4];         // B
                        cropBytes[dstIdx + 1] = bytes[p * 4 + 1]; // G
                        cropBytes[dstIdx + 2] = bytes[p * 4 + 2]; // R
                        cropBytes[dstIdx + 3] = bytes[p * 4 + 3]; // A
                    }

                    System.Runtime.InteropServices.Marshal.Copy(cropBytes, 0, cropData.Scan0, cropBytes.Length);
                    cropBmp.UnlockBits(cropData);

                    // Output square 512x512 with 24px padding
                    int targetSize = 512;
                    double padding = 24.0;
                    double availSize = targetSize - padding * 2;
                    double scale = Math.Min(availSize / cropW, availSize / cropH);
                    int drawW = (int)Math.Round(cropW * scale);
                    int drawH = (int)Math.Round(cropH * scale);
                    int drawX = (targetSize - drawW) / 2;
                    int drawY = (targetSize - drawH) / 2;

                    using (Bitmap finalBmp = new Bitmap(targetSize, targetSize, PixelFormat.Format32bppArgb)) {
                        using (Graphics g = Graphics.FromImage(finalBmp)) {
                            g.Clear(Color.Transparent);
                            g.SmoothingMode = SmoothingMode.HighQuality;
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                            g.DrawImage(cropBmp, new Rectangle(drawX, drawY, drawW, drawH));
                        }

                        string poseFile = Path.Combine(outDir, string.Format("pose-{0}-{1}.png", sheetName, o));
                        finalBmp.Save(poseFile, ImageFormat.Png);
                        Console.WriteLine("Saved: {0} ({1}x{2} from bbox [{3},{4} - {5}x{6}])", Path.GetFileName(poseFile), targetSize, targetSize, bMinX, bMinY, cropW, cropH);

                        // Also save aliases into public/images
                        SaveAliases(sheetName, o, finalBmp, imgDir);
                    }
                }
            }
        }
    }

    private static void SaveAliases(string sheet, int idx, Bitmap bmp, string imgDir) {
        if (sheet == "a") {
            if (idx == 0) {
                bmp.Save(Path.Combine(imgDir, "mascot-tour.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-camera.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-waving.png"), ImageFormat.Png);
            } else if (idx == 1) {
                bmp.Save(Path.Combine(imgDir, "mascot-map.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-thinking.png"), ImageFormat.Png);
            } else if (idx == 2) {
                bmp.Save(Path.Combine(imgDir, "mascot-safari.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-suitcase.png"), ImageFormat.Png);
            } else if (idx == 3) {
                bmp.Save(Path.Combine(imgDir, "mascot-local-guide.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-nonla.png"), ImageFormat.Png);
            } else if (idx == 4) {
                bmp.Save(Path.Combine(imgDir, "mascot-idea.png"), ImageFormat.Png);
            } else if (idx == 5) {
                bmp.Save(Path.Combine(imgDir, "mascot-announce.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-speaker.png"), ImageFormat.Png);
            }
        } else if (sheet == "b") {
            if (idx == 0) {
                bmp.Save(Path.Combine(imgDir, "mascot-pin.png"), ImageFormat.Png);
            } else if (idx == 1) {
                bmp.Save(Path.Combine(imgDir, "mascot-laptop-happy.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-working.png"), ImageFormat.Png);
            } else if (idx == 2) {
                bmp.Save(Path.Combine(imgDir, "mascot-route.png"), ImageFormat.Png);
            } else if (idx == 3) {
                bmp.Save(Path.Combine(imgDir, "mascot-hiking.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-running.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-traveling.png"), ImageFormat.Png);
            } else if (idx == 4) {
                bmp.Save(Path.Combine(imgDir, "mascot-hero.png"), ImageFormat.Png);
                bmp.Save(Path.Combine(imgDir, "mascot-celebrate.png"), ImageFormat.Png);
            } else if (idx == 5) {
                bmp.Save(Path.Combine(imgDir, "mascot-reading.png"), ImageFormat.Png);
            }
        }
    }
}

