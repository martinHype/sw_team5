<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 *
 * @property int $idcategory
 * @property string $category_name
 * @property Carbon $created_on
 * @property Carbon $modified_on
 *
 * @property Collection|Article[] $articles
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'category';
	protected $primaryKey = 'idcategory';
	public $timestamps = false;

	protected $casts = [
		'created_on' => 'datetime',
		'modified_on' => 'datetime'
	];

	protected $fillable = [
		'category_name',
		'created_on',
		'modified_on',
        'event_id',
        'is_active'
	];

	public function articles()
	{
		return $this->hasMany(Article::class, 'category_idcategory');
	}
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'idevent'); // Foreign key: event_id, Local key: idevent
    }



}
