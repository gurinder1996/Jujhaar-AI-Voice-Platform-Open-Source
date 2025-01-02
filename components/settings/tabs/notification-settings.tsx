"use client"

import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notification Settings</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Summary</label>
          <p className="text-sm text-muted-foreground">
            Phonely will send you a summary of key call information and insights via email.
          </p>
          <Select defaultValue="never">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Agent Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Phonely will notify you via the methods below for special cases regarding agent properties.
              Additional notifications can be configured in the "workflows tab".
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="mb-2 text-sm font-medium">Contact Information</h5>
              <p className="mb-4 text-sm text-muted-foreground">
                Enter the email & SMS numbers to be contacted from the agent, default is the info you signed up with.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm">Email</label>
                  <Input className="mt-1" placeholder="Enter an email address" />
                </div>
                <div>
                  <label className="text-sm">Phone Number</label>
                  <Input className="mt-1" placeholder="Enter a phone number" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <NotificationToggle
                title="Every Call"
                description="Occurs after every call with a customer."
              />
              <NotificationToggle
                title="Live Action Error"
                description="Occurs if there is a live action that fails on call with a customer."
              />
              <NotificationToggle
                title="Unhappy Customer"
                description="Occurs if Phonely detects that a customer is overly hostile, or not happy with the information provided."
              />
              <NotificationToggle
                title="Required Information"
                description="Occurs if your agent doesn't have context to answer the question a customer asked."
              />
              <NotificationToggle
                title="Human Follow Up"
                description="Occurs if your agent requires a human to follow up with the customer."
              />
            </div>
          </div>
        </div>
      </div>

      <Button className="bg-primary text-primary-foreground">Save Changes</Button>
    </div>
  )
}

interface NotificationToggleProps {
  title: string
  description: string
}

function NotificationToggle({ title, description }: NotificationToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-4">
        <Switch aria-label="Email notifications" />
        <Switch aria-label="SMS notifications" />
      </div>
    </div>
  )
}