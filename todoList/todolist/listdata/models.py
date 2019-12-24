from django.db import models


class Tag(models.Model):
    t_id = models.AutoField(primary_key=True,max_length=4)
    name = models.CharField(max_length=40)
    t_level = models.IntegerField(default=0)  # 0最低，1中等，2紧急


class Item(models.Model):
    i_id = models.AutoField(primary_key=True,max_length=4)
    i_tag = models.ForeignKey(Tag,on_delete='CASCADE')
    content = models.CharField(max_length=200)
    expire = models.CharField(max_length=100)
    status = models.CharField(max_length=40)
    i_level = models.IntegerField(default=0)  # 0最低，1中等，2紧急
