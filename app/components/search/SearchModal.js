export const SearchModal = ({ isModalOpen, modalData, handleModalClose }) => {
   return (
      <div
         style={{
            position: 'fixed',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            padding: 40,
            overflow: 'auto',
            display: isModalOpen ? 'block' : 'none',
            backgroundColor: '#333'
         }}>
         <h1>Modal</h1>
         <button onClick={handleModalClose}>Close</button>
         {modalData ? <div>{JSON.stringify(modalData)}</div> : <div>Loading...</div>}
      </div>
   );
};
