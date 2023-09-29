<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'asset_id',
        'currency',
        'amount',
        'description',
        'type',
        'method',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];
    
    /**
    * The relationships that should always be loaded.
    *
    * @var array
    */
    protected $with = [
        'asset',
    ];
    
    /* *
    * Prepare a date for array / JSON serialization.
    *
    * @param  \DateTimeInterface  $date
    * @return string
    */
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->toDateTimeString();
    }

    /**
     * 
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 
     */
    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}
