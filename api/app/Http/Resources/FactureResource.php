<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FactureResource extends JsonResource
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
            'ref' => $this->ref,
            'date' => date('d/m/Y', strtotime($this->date)),
            'project' => $this->project?->title,
            'client' => $this->project?->client->name,
            'total' => $this->total,
            'status' => $this->status,
            'created_at' => $this->created_at->format('d/m/Y à H:m'),
            'elements' => $this->elements
        ];
    }
}
