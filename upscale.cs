using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public class Upscaler {
    public static void Upscale(string inDir, string outDir, float scale) {
        if (!Directory.Exists(outDir)) Directory.CreateDirectory(outDir);
        foreach (var file in Directory.GetFiles(inDir, "*.jpg")) {
            using (var img = Image.FromFile(file)) {
                int w = (int)(img.Width * scale);
                int h = (int)(img.Height * scale);
                using (var bmp = new Bitmap(w, h)) {
                    using (var g = Graphics.FromImage(bmp)) {
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.SmoothingMode = SmoothingMode.HighQuality;
                        g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                        g.CompositingQuality = CompositingQuality.HighQuality;
                        g.DrawImage(img, 0, 0, w, h);
                    }
                    string outPath = Path.Combine(outDir, Path.GetFileName(file));
                    bmp.Save(outPath, ImageFormat.Jpeg);
                }
            }
        }
    }
}
