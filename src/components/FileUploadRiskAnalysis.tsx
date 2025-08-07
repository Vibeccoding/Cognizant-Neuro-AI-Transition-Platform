import React, { useState, useCallback } from 'react';
import { Upload, File, CheckCircle, AlertTriangle, X, Brain, BarChart3, Shield } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: 'analyzing' | 'completed' | 'failed';
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  findings: {
    category: string;
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }[];
  mitigationSuggestions: string[];
}

interface FileUploadRiskAnalysisProps {
  onFileAnalyzed?: (file: UploadedFile) => void;
}

const FileUploadRiskAnalysis: React.FC<FileUploadRiskAnalysisProps> = ({ onFileAnalyzed }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="text-green-500" size={16} />;
      case 'medium': return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'high': return <AlertTriangle className="text-orange-500" size={16} />;
      case 'critical': return <AlertTriangle className="text-red-500" size={16} />;
      default: return <AlertTriangle className="text-gray-500" size={16} />;
    }
  };

  const simulateFileAnalysis = (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const riskScore = Math.floor(Math.random() * 100);
        const riskLevel = riskScore < 25 ? 'low' : riskScore < 50 ? 'medium' : riskScore < 75 ? 'high' : 'critical';
        
        const analyzedFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
          status: 'completed',
          riskScore,
          riskLevel,
          findings: [
            { category: 'Security Vulnerabilities', count: Math.floor(Math.random() * 10), severity: riskLevel },
            { category: 'Compliance Issues', count: Math.floor(Math.random() * 5), severity: 'medium' },
            { category: 'Data Quality Issues', count: Math.floor(Math.random() * 8), severity: 'low' },
            { category: 'Performance Risks', count: Math.floor(Math.random() * 6), severity: 'medium' },
          ],
          mitigationSuggestions: [
            'Implement additional security controls and access restrictions',
            'Update compliance documentation and procedures',
            'Establish data validation and cleansing protocols',
            'Optimize performance monitoring and alerting systems',
            'Conduct regular security audits and assessments',
          ]
        };
        resolve(analyzedFile);
      }, 2000 + Math.random() * 3000); // Simulate 2-5 second analysis
    });
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    setAnalyzing(true);
    
    for (const file of files) {
      // Add file with analyzing status
      const tempFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: 'analyzing',
        riskScore: 0,
        riskLevel: 'low',
        findings: [],
        mitigationSuggestions: []
      };
      
      setUploadedFiles(prev => [...prev, tempFile]);
      
      try {
        const analyzedFile = await simulateFileAnalysis(file);
        setUploadedFiles(prev => 
          prev.map(f => f.id === tempFile.id ? analyzedFile : f)
        );
        onFileAnalyzed?.(analyzedFile);
      } catch (error) {
        setUploadedFiles(prev => 
          prev.map(f => f.id === tempFile.id ? { ...f, status: 'failed' as const } : f)
        );
      }
    }
    
    setAnalyzing(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalRisks = uploadedFiles.reduce((sum, file) => 
    sum + file.findings.reduce((findingsSum, finding) => findingsSum + finding.count, 0), 0
  );

  const averageRiskScore = uploadedFiles.length > 0 
    ? Math.round(uploadedFiles.reduce((sum, file) => sum + file.riskScore, 0) / uploadedFiles.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Upload Stats */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <File className="text-blue-600 mr-2" size={20} />
              <h3 className="font-semibold text-blue-800">Files Analyzed</h3>
            </div>
            <div className="text-2xl font-bold text-blue-900">{uploadedFiles.filter(f => f.status === 'completed').length}</div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-orange-600 mr-2" size={20} />
              <h3 className="font-semibold text-orange-800">Total Risks Found</h3>
            </div>
            <div className="text-2xl font-bold text-orange-900">{totalRisks}</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <BarChart3 className="text-purple-600 mr-2" size={20} />
              <h3 className="font-semibold text-purple-800">Avg Risk Score</h3>
            </div>
            <div className="text-2xl font-bold text-purple-900">{averageRiskScore}/100</div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="text-green-600 mr-2" size={20} />
              <h3 className="font-semibold text-green-800">Mitigations</h3>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {uploadedFiles.reduce((sum, file) => sum + file.mitigationSuggestions.length, 0)}
            </div>
          </div>
        </div>
      )}

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div
          className={`text-center ${dragActive ? 'bg-blue-50 border-blue-300' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-primary-600">
              <Brain size={32} />
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Files for Cognizant Neuro AI Risk Analysis
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your files here, or click to browse and upload
              </p>
              <label className="btn-primary cursor-pointer inline-block">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.json"
                />
                Browse Files
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT, CSV, JSON
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Files & Analysis Results</h3>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <File className="text-gray-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{file.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.uploadDate.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'completed' && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(file.riskLevel)}`}>
                      {file.riskLevel.toUpperCase()} RISK ({file.riskScore}/100)
                    </span>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {file.status === 'analyzing' && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Analyzing with Cognizant Neuro AI...</span>
                </div>
              )}

              {file.status === 'completed' && (
                <div className="space-y-4">
                  {/* Findings Summary */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Risk Findings</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {file.findings.map((finding, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getSeverityIcon(finding.severity)}
                            <span className="text-sm font-medium text-gray-700">{finding.category}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{finding.count} issues</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mitigation Suggestions */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Cognizant Neuro AI Mitigation Suggestions</h5>
                    <div className="space-y-2">
                      {file.mitigationSuggestions.slice(0, 3).map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-sm text-green-800">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {file.status === 'failed' && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle size={16} />
                  <span className="text-sm">Analysis failed. Please try uploading again.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadRiskAnalysis;
