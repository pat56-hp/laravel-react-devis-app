import React from 'react'

export default function ElementFacture({index, setElements, element, setSousTotal, setTotal, remise}) {
    const styleBtnDelete = {
        padding: '6rem .5rem',
        fontSize: '20px',
        cursor: 'pointer',
    }

    const deleteLine = (index) => {
        setElements(el => {
            const newElements = el.filter((_, i) => i !== index)
            
            // Calcul du sous-total et du total
            let sousTotal = 0;
            let total = 0;
            newElements.forEach((element, index) => {
                newElements[index]['montant'] = element.prix * element.qty
                sousTotal += element.montant;
                total += element.montant;
            });
    
            // Mise à jour des états de sous-total et total
            sousTotal = sousTotal > 0 ? sousTotal : 0
            total = total - remise > 0 ? total - remise : 0
            setTotal(sousTotal);
            setSousTotal(total);
    
            return newElements;
        })
    }

    //Modification et mise a jour des champs
    const updateElement = (index, field, value) => {
        setElements(elements => {
            const newElements = [...elements];
            newElements[index][field] = value;
    
            // Mise à jour du montant en fonction de 'qty' ou 'prix'
            if (field == 'qty' || field == 'prix') {
                const qty = newElements[index]['qty'];
                const prix = newElements[index]['prix'];
                const montant = qty * prix;
                newElements[index]['montant'] = montant;
            }
    
            // Calcul du sous-total et du total
            let sousTotal = 0;
            newElements.forEach(element => {
                sousTotal += parseFloat(element.montant);
            });
    
            // Mise à jour des états de sous-total et total
            setSousTotal(sousTotal);
            const total = parseFloat(sousTotal) - parseFloat(remise)
            setTotal(total > 0 ? total : 0);
    
            return newElements;
        });
    };
    


  return (
    <div className="table-responsive d-flex justify-content-between align-items-center">
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Montant</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className='pl-0'>
                        <input 
                            type='text'
                            value={element.libelle}
                            className='form-control'
                            placeholder="Nom de l'élément" 
                            onChange={(e) => updateElement(index, 'libelle', e.target.value)}/>
                    </td>
                    <td className='pl-0'>
                        <input 
                            value={element.qty}
                            type='number' 
                            className='form-control'
                            min={1}
                            placeholder="Quantité" 
                            onChange={(e) => updateElement(index, 'qty', e.target.value)}/>
                    </td>
                    <td className='pl-0'>
                        <input 
                            type='number' 
                            className='form-control'
                            value={element.prix}
                            min={0}
                            placeholder="Prix" 
                            onChange={(e) => updateElement(index, 'prix', e.target.value)}/>
                    </td>
                    <td rowSpan="2" className="amount-cell text-rigth" style={{background: '#F1F4F5'}}>
                        {element.montant}
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" className='pl-0 pb-0'> 
                        <textarea 
                            value={element.description  == null ? "" : element.description}
                            name="product-description" 
                            className="form-control border-0 p-2" 
                            id="productDescription" 
                            placeholder="Entrez une description(Facultative)" 
                            cols="30" 
                            rows="5"
                            style={{height: '100px'}}
                            onChange={(e) => updateElement(index, 'description', e.target.value)}>
                        </textarea> 
                    </td>
                </tr>
            </tbody>
        </table>
        <i
            onClick={() => deleteLine(index)}
            className="mdi mdi-delete text-muted text-center delete-row-btn"
            style={styleBtnDelete}></i>
    </div>
  )
}
