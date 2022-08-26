import { useState } from 'react';
import { Modal } from 'atlasuikit'
const DetailsModal=()=>{
    const [isopen,setIsOpen]=useState(false);
    return(
        <div>
            <Modal isOpen={isopen}
            handleClose={()=>setIsOpen(false)}
            >
               <h4>
                   Sample Modal Content
               </h4>
            </Modal>
            <button
               style={{marginBottom:"2em"}}
               className="primary-blue"
               onClick={()=>setIsOpen(true)}>
              Show Modal
            </button>
        </div>
    )
}
export default DetailsModal;