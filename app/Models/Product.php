<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;


class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
    'name',
    'description',
    'price',
    'stock',
    'size',
    'color',
    'availability',
    'category_id',
    'brand_id',
    'status',
];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function images()
    {
    return $this->morphMany(Image::class, 'imageable');
    }

}
