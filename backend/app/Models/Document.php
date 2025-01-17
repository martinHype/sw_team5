<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Document
 * 
 * @property int $iddocument
 * @property string $document_name
 * @property string $document_path
 * @property Carbon $created_on
 * @property Carbon $modified_on
 * @property int $article_idarticle
 * 
 * @property Article $article
 *
 * @package App\Models
 */
class Document extends Model
{
	protected $table = 'document';
	protected $primaryKey = 'iddocument';
	public $incrementing = false;
	public $timestamps = true;

	protected $casts = [
		'iddocument' => 'int',
		'article_idarticle' => 'int'
	];

	protected $fillable = [
		'document_name',
		'document_path',
		'article_idarticle'
	];

	public function article()
	{
		return $this->belongsTo(Article::class, 'article_idarticle');
	}
}
