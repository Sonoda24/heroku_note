import csv
import datetime
import os
 
from django.core.management.base import BaseCommand

from .models import My_Data
from .models import My_Svg


class Command(BaseCommand):
 
 
    def handle(self, *args, **kwargs):
        date = datetime.date.today().strftime("%Y%m%d")
        file_path = "backup/" + "mydata_" + date + ".csv"
        os.makedirs("backup/", exist_ok=True)
 	
	""""
        with open(file_path, "w", newline="") as file:
            writer = csv.writer(file)
            header = [field.name for field in Kakeibo._meta.fields]
            writer.writerow(header)
            column_type = [field.__class__.__name__ for field in Kakeibo._meta.fields]
            writer.writerow(column_type)
            
            records = Kakeibo.objects.all()
            for data in records:
                writer.writerow([data.pk,
                                 str(data.date),
                                 data.category,
                                 data.money,
                                 data.quantity,
                                 data.memo])
        """"
        print("バックアップが完了しました")
