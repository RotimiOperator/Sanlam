<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'currency',
        'amount',
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
    
    /* *
    * Prepare a date for array / JSON serialization.
    *
    * @param  \DateTimeInterface  $date
    * @return string
    */
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->diffForHumans();
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function getAssetIdAttribute()
    {
        return '#' . str_pad($this->id, 8, 0, 0);
    }


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['asset_id'];

    /**
     * 
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
