<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProjectResource::collection(
            Project::orderByDesc('created_at')->with(['category', 'client'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:200',
            'category_id' => 'required|integer',
            'client_id' => 'required|integer',
            'begin_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d',
            'description' => 'required',
            'status' => 'required|integer',
            'file' => 'nullable|mimes:png,jpg,jpeg,doc,pdf'
        ]);

        if ($request->filled(['begin_date', 'end_date'])) {
            $request->validate([
                'begin_date' => 'nullable|before_or_equal:end_date',
                'end_date' => 'nullable|after_or_equal:begin_date',
            ]);
        }

        if ($request->hasFile('file')) {
            $fileName = time().'-'.uniqid().'.'.$request->file->getClientOriginalExtension();
            $path = 'files/'.date('Y').'/'.date('m');
            $request->file->move($path, $fileName);
            $urlFile = url($path.'/'.$fileName);
        }

        $data = [
            'title' => $request->title,
            'category_id' => $request->category_id,
            'client_id' => $request->client_id,
            'begin_date' => $request->begin_date,
            'end_date' => $request->end_date,
            'description' => $request->description,
            'status' => $request->status,
            'file' => $urlFile ?? null
        ];

        if (Project::create($data)) {
            return response()->json([
                'message' => 'Projet enregistré avec succès'
            ]);
        }

        return response()->json([
            'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement.'
        ], 419);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return response()->json([
            'data' => $project   
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'title' => 'required|max:200',
            'category_id' => 'required|integer',
            'client_id' => 'required|integer',
            'begin_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d',
            'description' => 'required',
            'status' => 'required|integer',
            'file' => 'nullable|mimes:png,jpg,jpeg,doc,pdf'
        ]);

        if ($request->filled(['begin_date', 'end_date'])) {
            $request->validate([
                'begin_date' => 'nullable|before_or_equal:end_date',
                'end_date' => 'nullable|after_or_equal:begin_date',
            ]);
        }

        if ($request->hasFile('file')) {
            $fileName = time().'-'.uniqid().'.'.$request->getClientOriginalExtension();
            $path = 'files/'.date('Y').'/'.date('m');
            $request->file->move($path, $fileName);
            $urlFile = url($path.'/'.$fileName);
        }

        $data = [
            'title' => $request->title,
            'category_id' => $request->category_id,
            'client_id' => $request->client_id,
            'begin_date' => $request->begin_date,
            'end_date' => $request->end_date,
            'description' => $request->description,
            'status' => $request->status,
            'file' => $urlFile ?? $project->file
        ];

        if ($project->update($data)) {
            return response()->json([
                'message' => 'Projet modifié avec succès'
            ]);
        }

        return response()->json([
            'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement.'
        ], 419);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès'
        ]);
    }
}
