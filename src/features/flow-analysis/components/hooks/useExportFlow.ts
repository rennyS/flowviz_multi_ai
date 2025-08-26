import { useCallback } from 'react';
import { useReactFlow, Node, Edge } from 'reactflow';
import { toPng } from 'html-to-image';
import { ExportOptions } from '../types';
import { AttackFlowNode, FlowEdge } from '../../types/attack-flow';
import { STIXBundleExporter } from '../../../flow-export/services/stixBundleExporter';

interface ExportData {
  nodes: AttackFlowNode[];
  edges: FlowEdge[];
}

export const useExportFlow = (data: ExportData) => {
  const { getViewport } = useReactFlow();

  const exportToPng = useCallback(async (filename: string = 'attack-flow') => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: '#0d1117',
        width: element.offsetWidth,
        height: element.offsetHeight,
        style: {
          transform: 'none',
        },
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting to PNG:', error);
    }
  }, []);

  const exportToJson = useCallback((filename: string = 'attack-flow') => {
    // Convert AttackFlowNode[] to React Flow Node[] format for STIX export
    const nodes: Node[] = data.nodes.map((node, index) => ({
      id: node.id || `node-${index}`,
      type: node.type,
      data: node,
      position: { x: 0, y: 0 } // Position doesn't matter for STIX
    }));

    const edges: Edge[] = data.edges.map((edge, index) => ({
      id: edge.id || `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: 'default'
    }));

    // Create STIX bundle
    const exporter = new STIXBundleExporter();
    const stixBundle = exporter.exportToSTIXBundle(nodes, edges);

    // Add metadata
    const exportData = {
      ...stixBundle,
      x_flowviz_metadata: {
        viewport: getViewport(),
        exportedAt: new Date().toISOString(),
        tool: 'FlowViz',
        version: '1.0.0'
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.download = `${filename}-stix.json`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [data, getViewport]);

  const handleExport = useCallback((format: ExportOptions['format'], filename?: string) => {
    const exportFilename = filename || `attack-flow-${Date.now()}`;
    
    if (format === 'png') {
      exportToPng(exportFilename);
    } else if (format === 'json') {
      exportToJson(exportFilename);
    }
  }, [exportToPng, exportToJson]);

  return { handleExport };
};