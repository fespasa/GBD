import React, { useState } from 'react';

function FileUploader({ onFilesSelected, maxFiles = 5, acceptedTypes = "image/*,.pdf,.doc,.docx" }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    addFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      // Validar tipo de archivo
      const isValidType = acceptedTypes === "image/*,.pdf,.doc,.docx" 
        ? file.type.startsWith('image/') || 
          file.type === 'application/pdf' ||
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : true;
      
      // Validar tamaño (max 10MB)
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      return isValidType && isValidSize;
    });

    const totalFiles = selectedFiles.length + validFiles.length;
    if (totalFiles > maxFiles) {
      alert(`Solo puedes subir máximo ${maxFiles} archivos`);
      return;
    }

    const updatedFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type === 'application/pdf') return '📄';
    if (file.type.includes('word')) return '📝';
    return '📎';
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
        Adjuntar archivos (opcional)
      </h3>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
        Puede adjuntar imágenes, documentos médicos o informes relevantes para su consulta.
      </p>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: dragOver ? '2px dashed #17ab9c' : '2px dashed #d1d5db',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          backgroundColor: dragOver ? '#f0fdfa' : '#f9fafb',
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          marginBottom: '16px'
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>📎</div>
        <p style={{ fontSize: '16px', color: '#374151', marginBottom: '4px' }}>
          Arrastra y suelta archivos aquí o haz clic para seleccionar
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Máximo {maxFiles} archivos, 10MB cada uno. Formatos: JPG, PNG, PDF, DOC, DOCX
        </p>
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>
            Archivos seleccionados ({selectedFiles.length}/{maxFiles})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{ fontSize: '20px' }}>{getFileIcon(file)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#111827', 
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {file.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;