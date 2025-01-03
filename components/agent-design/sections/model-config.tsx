"use client"

import { Brain } from "lucide-react"
import { useAgentField } from "@/hooks/use-agent-field"
import { useParams } from "next/navigation"
import { useCallback } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function ModelConfig() {
  const { agentId } = useParams()

  // Provider field
  const {
    value: provider,
    error: providerError,
    isUpdating: isProviderUpdating,
    onChange: onProviderChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'provider'],
    'model_config.provider',
    'openai'
  )

  // Emotion recognition field
  const {
    value: emotionRecognition,
    error: emotionError,
    isUpdating: isEmotionUpdating,
    onChange: onEmotionChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'emotionRecognition'],
    'model_config.emotionRecognition',
    false
  )

  // Fallback models field
  const {
    value: fallbackModels,
    error: fallbackError,
    isUpdating: isFallbackUpdating,
    onChange: onFallbackChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'fallbackModels'],
    'model_config.fallbackModels',
    []
  )

  // Max tokens field
  const {
    value: maxTokens,
    error: maxTokensError,
    isUpdating: isMaxTokensUpdating,
    onChange: onMaxTokensChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'maxTokens'],
    'model_config.maxTokens',
    2048
  )

  // Temperature field
  const {
    value: temperature,
    error: temperatureError,
    isUpdating: isTemperatureUpdating,
    onChange: onTemperatureChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'temperature'],
    'model_config.temperature',
    0.7
  )

  // Semantic caching field
  const {
    value: semanticCaching,
    error: cachingError,
    isUpdating: isCachingUpdating,
    onChange: onCachingChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'semanticCaching'],
    'model_config.semanticCaching',
    false
  )

  // Fast turns count field
  const {
    value: fastTurnsCount,
    error: turnsError,
    isUpdating: isTurnsUpdating,
    onChange: onTurnsChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'fastTurnsCount'],
    'model_config.fastTurnsCount',
    3
  )

  // System messages field
  const {
    value: systemMessages,
    error: messagesError,
    isUpdating: isMessagesUpdating,
    onChange: onMessagesChange
  } = useAgentField(
    agentId as string,
    ['model_config', 'systemMessages'],
    'model_config.systemMessages',
    ''
  )

  // Handle system messages changes with debounce
  const handleMessagesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessagesChange(e.target.value)
  }, [onMessagesChange])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5" />
        <h3 className="text-lg font-medium">Model Configuration</h3>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Provider Selection */}
          <div className="mb-6">
            <Label>Model Provider</Label>
            <Select
              value={provider}
              onValueChange={onProviderChange}
              disabled={isProviderUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
              </SelectContent>
            </Select>
            {providerError && (
              <p className="mt-1 text-sm text-destructive">{providerError}</p>
            )}
          </div>

          {/* Emotion Recognition */}
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emotion Recognition</Label>
              <p className="text-sm text-muted-foreground">
                Enable emotion recognition in responses
              </p>
            </div>
            <Switch
              checked={emotionRecognition}
              onCheckedChange={onEmotionChange}
              disabled={isEmotionUpdating}
            />
          </div>

          {/* Fallback Models */}
          <div className="mb-6">
            <Label>Fallback Models</Label>
            <Select
              value={fallbackModels[0]} // For now, just handle one fallback model
              onValueChange={(value) => onFallbackChange([value])}
              disabled={isFallbackUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fallback model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4 Mini</SelectItem>
              </SelectContent>
            </Select>
            {fallbackError && (
              <p className="mt-1 text-sm text-destructive">{fallbackError}</p>
            )}
          </div>

          {/* Model Settings */}
          <div className="mb-6 space-y-4">
            <Label>Model Settings</Label>

            {/* Max Tokens */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Max Tokens</Label>
                <span className="text-sm text-muted-foreground">{maxTokens}</span>
              </div>
              <Slider
                value={[maxTokens]}
                onValueChange={([value]) => onMaxTokensChange(value)}
                min={1}
                max={4096}
                step={1}
                disabled={isMaxTokensUpdating}
              />
              {maxTokensError && (
                <p className="text-sm text-destructive">{maxTokensError}</p>
              )}
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-sm text-muted-foreground">{temperature}</span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={([value]) => onTemperatureChange(value)}
                min={0}
                max={1}
                step={0.1}
                disabled={isTemperatureUpdating}
              />
              {temperatureError && (
                <p className="text-sm text-destructive">{temperatureError}</p>
              )}
            </div>

            {/* Semantic Caching */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Semantic Caching</Label>
                <p className="text-sm text-muted-foreground">
                  Cache similar responses for faster replies
                </p>
              </div>
              <Switch
                checked={semanticCaching}
                onCheckedChange={onCachingChange}
                disabled={isCachingUpdating}
              />
            </div>

            {/* Fast Turns Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Fast Turns Count</Label>
                <span className="text-sm text-muted-foreground">{fastTurnsCount}</span>
              </div>
              <Slider
                value={[fastTurnsCount]}
                onValueChange={([value]) => onTurnsChange(value)}
                min={0}
                max={10}
                step={1}
                disabled={isTurnsUpdating}
              />
              {turnsError && (
                <p className="text-sm text-destructive">{turnsError}</p>
              )}
            </div>
          </div>

          {/* System Messages */}
          <div>
            <Label>System Messages</Label>
            <p className="mb-2 text-sm text-muted-foreground">
              Configure system messages for your agent
            </p>
            <Textarea
              placeholder="Enter system messages..."
              className="min-h-[150px] resize-none"
              value={systemMessages}
              onChange={handleMessagesChange}
              disabled={isMessagesUpdating}
            />
            {messagesError && (
              <p className="mt-1 text-sm text-destructive">{messagesError}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
