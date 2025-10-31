import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  FormControlLabel,
  Switch,
  InputLabel,
  TextField,
} from '@mui/material';
import { 
  EnhancedDialog, 
  EnhancedDialogContent, 
  EnhancedDialogActions,
  PrimaryButton,
  SecondaryButton 
} from '../../../shared/components/EnhancedDialog';
import { 
  FormSection,
  FormSectionTitle,
  EnhancedSlider 
} from '../../../shared/components/EnhancedForm';
import { 
  DropdownFormControl, 
  DropdownSelect,
  DropdownMenuItem,
  dropdownMenuStylesDark 
} from '../../../shared/components/Dropdown';

interface SettingsDialogProps {
  open: boolean;
  cinematicMode: boolean;
  edgeColor: string;
  edgeStyle: string;
  edgeCurve: string;
  storyModeSpeed: number;
  aiProvider: 'anthropic' | 'openai' | 'gemini';
  aiApiKey: string;
  onClose: () => void;
  onCinematicModeChange: (enabled: boolean) => void;
  onEdgeColorChange: (color: string) => void;
  onEdgeStyleChange: (style: string) => void;
  onEdgeCurveChange: (curve: string) => void;
  onStoryModeSpeedChange: (speed: number) => void;
  onSave: (settings: {
    cinematicMode: boolean;
    edgeColor: string;
    edgeStyle: string;
    edgeCurve: string;
    storyModeSpeed: number;
    aiProvider: 'anthropic' | 'openai' | 'gemini';
    aiApiKey: string;
  }) => void;
  onAiProviderChange: (provider: 'anthropic' | 'openai' | 'gemini') => void;
  onAiApiKeyChange: (key: string) => void;
}

export default function SettingsDialog({
  open,
  cinematicMode,
  edgeColor,
  edgeStyle,
  edgeCurve,
  storyModeSpeed,
  aiProvider,
  aiApiKey,
  onClose,
  onCinematicModeChange,
  onEdgeColorChange,
  onEdgeStyleChange,
  onEdgeCurveChange,
  onStoryModeSpeedChange,
  onSave,
  onAiProviderChange,
  onAiApiKeyChange,
}: SettingsDialogProps) {
  // Local state for dialog - only apply on save
  const [localCinematicMode, setLocalCinematicMode] = useState(cinematicMode);
  const [localEdgeColor, setLocalEdgeColor] = useState(edgeColor);
  const [localEdgeStyle, setLocalEdgeStyle] = useState(edgeStyle);
  const [localEdgeCurve, setLocalEdgeCurve] = useState(edgeCurve);
  const [localStoryModeSpeed, setLocalStoryModeSpeed] = useState(storyModeSpeed);
  const [localAiProvider, setLocalAiProvider] = useState<'anthropic' | 'openai' | 'gemini'>(aiProvider);
  const [localAiApiKey, setLocalAiApiKey] = useState(aiApiKey);

  // Update local state when props change (when dialog opens)
  useEffect(() => {
    setLocalCinematicMode(cinematicMode);
    setLocalEdgeColor(edgeColor);
    setLocalEdgeStyle(edgeStyle);
    setLocalEdgeCurve(edgeCurve);
    setLocalStoryModeSpeed(storyModeSpeed);
    setLocalAiProvider(aiProvider);
    setLocalAiApiKey(aiApiKey);
  }, [cinematicMode, edgeColor, edgeStyle, edgeCurve, storyModeSpeed, aiProvider, aiApiKey, open]);

  const handleSave = () => {
    // Apply all settings at once by passing the local values directly
    onCinematicModeChange(localCinematicMode);
    onEdgeColorChange(localEdgeColor);
    onEdgeStyleChange(localEdgeStyle);
    onEdgeCurveChange(localEdgeCurve);
    onStoryModeSpeedChange(localStoryModeSpeed);
    onAiProviderChange(localAiProvider);
    onAiApiKeyChange(localAiApiKey);

    // Pass the values to save immediately
    onSave({
      cinematicMode: localCinematicMode,
      edgeColor: localEdgeColor,
      edgeStyle: localEdgeStyle,
      edgeCurve: localEdgeCurve,
      storyModeSpeed: localStoryModeSpeed,
      aiProvider: localAiProvider,
      aiApiKey: localAiApiKey
    });
  };

  const handleCancel = () => {
    // Reset local state to current values
    setLocalCinematicMode(cinematicMode);
    setLocalEdgeColor(edgeColor);
    setLocalEdgeStyle(edgeStyle);
    setLocalEdgeCurve(edgeCurve);
    setLocalStoryModeSpeed(storyModeSpeed);
    setLocalAiProvider(aiProvider);
    setLocalAiApiKey(aiApiKey);
    onClose();
  };
  return (
    <EnhancedDialog
      open={open}
      onClose={handleCancel}
      title="Settings"
      maxWidth="sm"
      fullWidth
      size="medium"
    >
      <EnhancedDialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          
          <FormSection>
            <FormSectionTitle>
              AI Provider
            </FormSectionTitle>

            <Typography sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.75rem',
              mb: 2
            }}>
              Choose which AI service to use for analysis and provide the corresponding API key.
            </Typography>

            <DropdownFormControl fullWidth>
              <InputLabel id="ai-provider-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Provider
              </InputLabel>
              <DropdownSelect
                labelId="ai-provider-label"
                value={localAiProvider}
                label="Provider"
                onChange={(event) => setLocalAiProvider(event.target.value as 'anthropic' | 'openai' | 'gemini')}
                MenuProps={dropdownMenuStylesDark}
              >
                <DropdownMenuItem value="anthropic">Anthropic Claude</DropdownMenuItem>
                <DropdownMenuItem value="openai">OpenAI</DropdownMenuItem>
                <DropdownMenuItem value="gemini">Google Gemini</DropdownMenuItem>
              </DropdownSelect>
            </DropdownFormControl>

            <Box sx={{ mt: 3 }}>
              <TextField
                label="API Key"
                type="password"
                fullWidth
                value={localAiApiKey}
                onChange={(event) => setLocalAiApiKey(event.target.value)}
                placeholder="Enter your API key"
                InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                inputProps={{
                  autoComplete: 'off'
                }}
                FormHelperTextProps={{ sx: { color: 'rgba(255, 255, 255, 0.5)' } }}
                helperText="Stored locally in your browser settings."
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)'
                    }
                  }
                }}
              />
            </Box>
          </FormSection>

          <FormSection>
            <FormSectionTitle>
              Story Mode
            </FormSectionTitle>
            
            <FormControlLabel
              control={
                <Switch
                  checked={localCinematicMode}
                  onChange={(e) => setLocalCinematicMode(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                      '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    fontSize: '0.9rem',
                    fontWeight: 500 
                  }}>
                    Cinematic Mode
                  </Typography>
                  <Typography sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    fontSize: '0.75rem',
                    mt: 0.5 
                  }}>
                    Fade top and bottom edges during story mode playback
                  </Typography>
                </Box>
              }
              sx={{ alignItems: 'flex-start', ml: 0 }}
            />
            
            <Box sx={{ mt: 3 }}>
              <FormSectionTitle sx={{ 
                fontSize: '0.9rem',
                fontWeight: 500,
                mb: 1,
              }}>
                Playback Speed
              </FormSectionTitle>
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: '0.75rem',
                mb: 2
              }}>
                Time between each step in story mode playback
              </Typography>
              <Box sx={{ px: 1 }}>
                <EnhancedSlider
                  value={localStoryModeSpeed || 3}
                  onChange={(_, newValue) => setLocalStoryModeSpeed(newValue as number)}
                  min={1}
                  max={10}
                  step={0.5}
                  marks={[
                    { value: 1, label: '1s' },
                    { value: 3, label: '3s' },
                    { value: 5, label: '5s' },
                    { value: 10, label: '10s' },
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}s`}
                />
              </Box>
            </Box>
          </FormSection>
          
          <FormSection>
            <FormSectionTitle>
              Edge Styling
            </FormSectionTitle>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DropdownFormControl size="small" fullWidth>
                <InputLabel>Color</InputLabel>
                <DropdownSelect
                  value={localEdgeColor}
                  onChange={(e) => setLocalEdgeColor(e.target.value as string)}
                  label="Color"
                  MenuProps={dropdownMenuStylesDark}
                >
                  <DropdownMenuItem value="default">Default (Blue)</DropdownMenuItem>
                  <DropdownMenuItem value="white">White</DropdownMenuItem>
                </DropdownSelect>
              </DropdownFormControl>
              
              <DropdownFormControl size="small" fullWidth>
                <InputLabel>Style</InputLabel>
                <DropdownSelect
                  value={localEdgeStyle}
                  onChange={(e) => setLocalEdgeStyle(e.target.value as string)}
                  label="Style"
                  MenuProps={dropdownMenuStylesDark}
                >
                  <DropdownMenuItem value="solid">Solid</DropdownMenuItem>
                  <DropdownMenuItem value="dashed">Dashed</DropdownMenuItem>
                </DropdownSelect>
              </DropdownFormControl>
              
              <DropdownFormControl size="small" fullWidth>
                <InputLabel>Curve</InputLabel>
                <DropdownSelect
                  value={localEdgeCurve}
                  onChange={(e) => setLocalEdgeCurve(e.target.value as string)}
                  label="Curve"
                  MenuProps={dropdownMenuStylesDark}
                >
                  <DropdownMenuItem value="smooth">Smooth (Curved)</DropdownMenuItem>
                  <DropdownMenuItem value="straight">Straight</DropdownMenuItem>
                  <DropdownMenuItem value="step">Step (Elbows)</DropdownMenuItem>
                </DropdownSelect>
              </DropdownFormControl>
            </Box>
          </FormSection>
          
        </Box>
      </EnhancedDialogContent>
      
      <EnhancedDialogActions>
        <SecondaryButton onClick={handleCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleSave}>
          Save Settings
        </PrimaryButton>
      </EnhancedDialogActions>
    </EnhancedDialog>
  );
}