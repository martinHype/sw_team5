<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UserHasRole
 * 
 * @property int $user_iduser
 * @property int $role_idrole
 * 
 * @property Role $role
 * @property User $user
 *
 * @package App\Models
 */
class UserHasRole extends Model
{
	protected $table = 'user_has_role';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'user_iduser' => 'int',
		'role_idrole' => 'int'
	];

	public function role()
	{
		return $this->belongsTo(Role::class, 'role_idrole');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_iduser');
	}
}
