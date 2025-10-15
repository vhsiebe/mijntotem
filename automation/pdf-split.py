import os
import PyPDF2
import pandas as pd
from pdf2image import convert_from_path
from PIL import Image
import boto3
from io import BytesIO 

os.environ['AWS_PROFILE'] = 'Siebe'

# Load CSV file with field names
csv_file = './csv-split.csv'
df = pd.read_csv(csv_file, sep=';')


# Function to process PDF and split into images
def process_pdf(pdf_file, df):
    # Set JPEG compression quality (0 to 100, higher is better quality)
    compression_quality = 95
    
    # Iterate over each row in the CSV
    for idx, row in df.iterrows():
        # Get the totem name and convert it to lowercase
        type = row[0].lower()
        totem_name = row[1].lower()
        color = row[2].lower()

        print(f'Processing {type} totem {totem_name} ({color})')

        # Create a directory for the totem if it doesn't exist
        totem_dir = os.path.join(os.getcwd(), totem_name)
        if not os.path.exists(totem_dir):
            os.makedirs(totem_dir)

        # Iterate over front and back
        for side in ['front', 'back']:
            # Get field name corresponding to the side
            field_name = f'{type}-{totem_name}-{color}-{side}'

            # Determine the page number based on the row index and side
            page_num = idx * 2 if side == 'front' else idx * 2 + 1

            # Convert PDF page to PIL image
            pages = convert_from_path(pdf_file, dpi=300, first_page=page_num+1, last_page=page_num+1)
            if pages:
                image = pages[0]
                output_jpg = os.path.join(totem_dir, f'{field_name}.jpg')

                s3_object_key = f'{totem_name}/{field_name}.jpg'
                with BytesIO() as image_bytes:
                    image.save(image_bytes, format='JPEG')
                    image_bytes.seek(0)
                    s3_client.upload_fileobj(image_bytes, s3_bucket, s3_object_key)
                    print(f"Uploaded {field_name}.jpg to S3 bucket {s3_bucket} at key {s3_object_key}")
            else:
                print(f"No pages found for {field_name} in {pdf_file}")


s3_bucket = 'mijn-totem'
s3_client = boto3.client('s3')
# Load PDF file

process_pdf('total.pdf', df)