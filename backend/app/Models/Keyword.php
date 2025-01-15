<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    use HasFactory;

    // Specify the table name if it doesn't follow the Laravel naming convention
    // protected $table = 'key_words';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'word', // Add any additional fields here
    ];

    /**
     * Define a many-to-many relationship with the Article model.
     */
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_has_keywords', 'keyword_id', 'article_id')
                    ->withTimestamps();
    }
}

