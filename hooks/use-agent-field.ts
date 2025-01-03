import { useEffect, useState } from 'react'
import { updateAgentField } from '@/lib/supabase/agent-updates'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useAgentField(
  agentId: string,
  fieldPath: string[],
  schemaKey: string,
  initialValue: any
) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false)
  const supabase = createClientComponentClient()

  // Update local value when initialValue changes
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue)
    }
  }, [initialValue])

  useEffect(() => {
    // Only load initial value if we haven't loaded it yet
    if (hasLoadedInitial) return

    const loadInitialValue = async () => {
      try {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('id', agentId)
          .single()

        if (error) {
          console.error('Error loading initial value:', error)
          return
        }

        if (data) {
          // Get nested value using fieldPath
          const fieldValue = fieldPath.reduce((obj, key) => obj?.[key], data)
          console.log('Loaded initial value:', fieldValue)
          setValue(fieldValue ?? '') // Use empty string if value is null/undefined
        }
      } catch (error) {
        console.error('Error in loadInitialValue:', error)
      } finally {
        setHasLoadedInitial(true)
      }
    }

    if (agentId) {
      loadInitialValue()
    }
  }, [agentId, fieldPath, hasLoadedInitial, supabase])

  const handleChange = (newValue: any) => {
    const safeValue = newValue || ''
    console.log('Handling change:', safeValue)
    setValue(safeValue)
    setError(null)
  }

  const handleBlur = async () => {
    if (!hasLoadedInitial || !agentId) return false
    
    console.log('Handling blur. Current value:', value)
    setIsUpdating(true)
    
    try {
      // First try direct Supabase update for simple fields
      if (fieldPath.length === 1) {
        const { data, error } = await supabase
          .from('agents')
          .update({ [fieldPath[0]]: value })
          .eq('id', agentId)
          .select()
          .single()

        console.log('Supabase update result:', { data, error })

        if (error) {
          setError(error.message)
          return false
        }

        return true
      }

      // For nested fields or if direct update fails, use updateAgentField
      const result = await updateAgentField(agentId, fieldPath, value, schemaKey)
      console.log('Update result:', result)

      if (!result.success) {
        setError(Array.isArray(result.error) 
          ? result.error[0]?.message 
          : result.error
        )
        return false
      }

      return true
    } catch (error) {
      console.error('Error in handleBlur:', error)
      setError(error instanceof Error ? error.message : 'Update failed')
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    value: value || '',
    error,
    isUpdating,
    isLoading: !hasLoadedInitial,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue 
  }
}
