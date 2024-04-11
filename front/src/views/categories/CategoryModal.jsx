import React from 'react'

export default function CategoryModal({isUpdating, categorie, setCategorie, handleSumbit, errors, closeRef}) {

  return (
    <div className="modal fade" id="newCategorie" style={{display: "none"}} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                      {isUpdating ? 'Modification de la catégorie' : 'Nouvelle catégorie'}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal"><span>×</span>
                    </button>
                </div>
                <form onSubmit={handleSumbit}>
                  <div className="modal-body">
                    {
                        errors && 
                        (
                        <div className='alert alert-danger mb-0'>
                            {Object.keys(errors).map(key => (
                            <span key={key}>{errors[key]} <br/></span>
                            ))}
                        </div>
                        )
                    }
                
                    <div className="col-md-12 p-0">
                        <label className="m-t-20">Libéllé <span className='text-danger'>*</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Libéllé de la catégorie"
                          value={categorie.libelle}
                          onChange={(e) => setCategorie({...categorie, libelle: e.target.value})}
                        />
                    </div>
                    {
                      !isUpdating &&
                      <div className='col-md-12 p-0'>
                        <div className="form-check m-t-20">
                          <input className="form-check-input" id='status' type="checkbox" defaultChecked={categorie.status} onChange={(e) => setCategorie({...categorie, status: !categorie.status})} />
                          <label className="form-check-label" htmlFor="status">Activer la catégorie</label>
                        </div>
                      </div>
                    }
                </div>
                  <div className="modal-footer">
                      <button type="button" ref={closeRef}  className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                      <button type="submit" className="btn btn-primary">Sauvegarder</button>
                  </div>
                </form>
            </div>
        </div>
      </div>
  )
}
