<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'status' => $this->status,
            'profession' => $this->profession,
            'adresse' => $this->adresse,
            'phone' => $this->phone,
            'role' => $this->role,
            'created_at' => $this->created_at->format('d-m-Y à H:m'),
        ];
    }
}
