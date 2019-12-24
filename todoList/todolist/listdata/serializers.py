from rest_framework import serializers
# from listdata.models import Tag,Item
from listdata.models import Tag,Item


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('t_id','name', 't_level')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('i_id','i_tag', 'content', 'expire', 'status','i_level')