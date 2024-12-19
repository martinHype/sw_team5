<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Event
 *
 * @property int $idevent
 * @property string $event_name
 * @property Carbon $event_date
 * @property Carbon $event_upload_EndDate
 * @property Carbon $created_on
 * @property Carbon $modified_on
 *
 * @property Collection|Article[] $articles
 *
 * @package App\Models
 */
class Event extends Model
{
	protected $table = 'event';
	protected $primaryKey = 'idevent';
	public $timestamps = false;

	protected $casts = [
		'event_date' => 'datetime',
		'event_upload_EndDate' => 'datetime',
		'created_on' => 'datetime',
		'modified_on' => 'datetime'
	];

	protected $fillable = [
		'event_name',
		'event_date',
		'event_upload_EndDate',
		'created_on',
		'modified_on',
        'password',
        'description',
	];

	public function articles()
	{
		return $this->hasMany(Article::class, 'event_idevent');

	}

    public function categories()
    {
        return $this->hasMany(Category::class, 'event_id');
    }
}
