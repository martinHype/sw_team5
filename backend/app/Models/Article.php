<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Article
 *
 * @property int $idarticle
 * @property int $user_iduser
 * @property string $title
 * @property string|null $Description
 * @property int $event_idevent
 * @property int $status_idstatus
 * @property int $acticle_status_idacticle_status
 * @property int $category_idcategory
 * @property int $idreviewer
 * @property string|null $positive_review
 * @property string|null $negative_review
 * @property Carbon $created_on
 * @property Carbon $modified_on
 *
 * @property ActicleStatus $acticle_status
 * @property Category $category
 * @property Event $event
 * @property User $user
 * @property Collection|Document[] $documents
 *
 * @package App\Models
 */
class Article extends Model
{
	protected $table = 'article';
	protected $primaryKey = 'idarticle';
	public $timestamps = true;

	protected $casts = [
		'user_iduser' => 'int',
		'event_idevent' => 'int',
		'status_idstatus' => 'int',
		'acticle_status_idacticle_status' => 'int',
		'category_idcategory' => 'int',
		'idreviewer' => 'int',
	];

	protected $fillable = [
		'user_iduser',
		'title',
		'Description',
		'event_idevent',
		'acticle_status_idacticle_status',
		'category_idcategory',
		'idreviewer',
		'actuality_difficulty',
		'orientation_in_theme',
		'work_corresponding_template',
		'missing_slovak_or_english_title',
		'missing_slovak_or_english_abstract',
		'missing_abstract_length',
		'missing_part',
		'positive_review',
		'negative_review',
	];

	public function acticle_status()
	{
		return $this->belongsTo(ActicleStatus::class, 'acticle_status_idacticle_status');
	}

	public function category()
	{
		return $this->belongsTo(Category::class, 'category_idcategory');
	}

	public function event()
	{
		return $this->belongsTo(Event::class, 'event_idevent');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_iduser');
	}
	public function reviewer()
	{
		return $this->belongsTo(User::class, 'idreviewer');
	}

	public function documents()
	{
		return $this->hasMany(Document::class, 'article_idarticle');
	}
}
