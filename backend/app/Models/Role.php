<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 * 
 * @property int $idrole
 * @property string $role_name
 * @property Carbon $created_on
 * @property Carbon $modified_on
 * 
 * @property Collection|User[] $users
 *
 * @package App\Models
 */
class Role extends Model
{
	protected $table = 'role';
	protected $primaryKey = 'idrole';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'idrole' => 'int',
		'created_on' => 'datetime',
		'modified_on' => 'datetime'
	];

	protected $fillable = [
		'role_name',
		'created_on',
		'modified_on'
	];

	public function users()
	{
		return $this->belongsToMany(User::class, 'user_has_role', 'role_idrole', 'user_iduser');
	}
}
