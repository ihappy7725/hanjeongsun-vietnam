"""Re-export catalog cuts at native resolution, preserving smooth white edges."""
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent.parent
for name,page,box in [('strawberry',33,(155,850,410,1095)),('fig',36,(155,225,420,485)),('strawberry-yogurt',36,(585,225,830,480)),('mango-yogurt',36,(160,850,415,1095))]:
    image=Image.open(root/'reference'/f'{page}.png').convert('RGB').crop(box)
    canvas=Image.new('RGB',(360,360),'white')
    canvas.paste(image,((360-image.width)//2,(360-image.height)//2))
    canvas.save(root/'assets'/f'{name}.webp',lossless=True)
    print(f'{name}: native cut {image.width}x{image.height}, no upscaling, lossless WebP')
