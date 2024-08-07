from django.db import models

class Introduction(models.Model):
    content = models.TextField()
    
    def __str__(self):
        return f"Introduction"

class Definition(models.Model):
    book_position = models.IntegerField()
    figure_name = models.CharField(max_length=255)
    content = models.TextField()
    custom_rules = models.TextField()
    
    def __str__(self):
        return f"{self.book_position} - {self.figure_name.capitalize()}"
    
class Usage(models.Model):
    book_position = models.IntegerField()
    figure_name = models.CharField(max_length=255)
    content = models.TextField()
    custom_rules = models.TextField()
    
    def __str__(self):
        return f"{self.book_position} - {self.figure_name.capitalize()}"