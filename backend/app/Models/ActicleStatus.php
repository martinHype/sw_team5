<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ActicleStatus
 * 
 * @property int $idacticle_status
 * @property string $acticle_status_name
 * @property Carbon $created_on
 * @property Carbon $modified_on
 * 
 * @property Collection|Article[] $articles
 *
 * @package App\Models
 */
class ActicleStatus extends Model
{
	protected $table = 'acticle_status';
	protected $primaryKey = 'idacticle_status';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'idacticle_status' => 'int',
		'created_on' => 'datetime',
		'modified_on' => 'datetime'
	];

	protected $fillable = [
		'acticle_status_name',
		'created_on',
		'modified_on'
	];

	public function articles()
	{
		return $this->hasMany(Article::class, 'acticle_status_idacticle_status');
	}
}
