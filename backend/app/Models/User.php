<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $iduser
 * @property string $email
 * @property string $password
 * @property string|null $firstname
 * @property string|null $lastname
 * @property Carbon $created_at
 * @property Carbon $modified_at
 * 
 * @property Collection|Article[] $articles
 * @property Collection|Role[] $roles
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'user';
	protected $primaryKey = 'iduser';
	public $timestamps = false;

	protected $casts = [
		'modified_at' => 'datetime'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'firstname',
		'lastname',
		'modified_at'
	];

	public function articles()
	{
		return $this->hasMany(Article::class, 'idreviewer');
	}

	public function roles()
	{
		return $this->belongsToMany(Role::class, 'user_has_role', 'user_iduser', 'role_idrole');
	}
}
