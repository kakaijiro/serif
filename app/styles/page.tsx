import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorSwatchProps {
  name: string
  color: string
}

function ColorSwatch({ name, color }: ColorSwatchProps) {
  // Extract the CSS variable name from the color string
  const cssVar = color.replace('hsl(var(--', '').replace('))', '')
  
  return (
    <div className="flex flex-col gap-2">
      <div 
        className="w-16 h-16 rounded-lg border"
        style={{ backgroundColor: `var(--${cssVar})` }}
      />
      <div className="text-xs">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground">{color}</div>
      </div>
    </div>
  )
}

interface TypographyExampleProps {
  variant: string
  className: string
  children: React.ReactNode
}

function TypographyExample({ variant, className, children }: TypographyExampleProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-muted-foreground font-mono">{variant}</div>
      <div className={className}>{children}</div>
    </div>
  )
}

export default function StylesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Design System</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive showcase of Serif&apos;s design tokens, colors, typography, and components.
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Color Palette</h2>
          
          {/* Primary Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
              <CardDescription>Core brand and interface colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorSwatch name="Primary" color="hsl(var(--primary))" />
                <ColorSwatch name="Primary Foreground" color="hsl(var(--primary-foreground))" />
                <ColorSwatch name="Secondary" color="hsl(var(--secondary))" />
                <ColorSwatch name="Secondary Foreground" color="hsl(var(--secondary-foreground))" />
                <ColorSwatch name="Accent" color="hsl(var(--accent))" />
                <ColorSwatch name="Accent Foreground" color="hsl(var(--accent-foreground))" />
              </div>
            </CardContent>
          </Card>

          {/* Background Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Background Colors</CardTitle>
              <CardDescription>Surface and background colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorSwatch name="Background" color="hsl(var(--background))" />
                <ColorSwatch name="Foreground" color="hsl(var(--foreground))" />
                <ColorSwatch name="Card" color="hsl(var(--card))" />
                <ColorSwatch name="Card Foreground" color="hsl(var(--card-foreground))" />
                <ColorSwatch name="Popover" color="hsl(var(--popover))" />
                <ColorSwatch name="Popover Foreground" color="hsl(var(--popover-foreground))" />
              </div>
            </CardContent>
          </Card>

          {/* Muted Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Muted Colors</CardTitle>
              <CardDescription>Subtle and muted interface colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorSwatch name="Muted" color="hsl(var(--muted))" />
                <ColorSwatch name="Muted Foreground" color="hsl(var(--muted-foreground))" />
                <ColorSwatch name="Border" color="hsl(var(--border))" />
                <ColorSwatch name="Input" color="hsl(var(--input))" />
                <ColorSwatch name="Ring" color="hsl(var(--ring))" />
                <ColorSwatch name="Destructive" color="hsl(var(--destructive))" />
              </div>
            </CardContent>
          </Card>

          {/* Chart Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Chart Colors</CardTitle>
              <CardDescription>Data visualization colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorSwatch name="Chart 1" color="hsl(var(--chart-1))" />
                <ColorSwatch name="Chart 2" color="hsl(var(--chart-2))" />
                <ColorSwatch name="Chart 3" color="hsl(var(--chart-3))" />
                <ColorSwatch name="Chart 4" color="hsl(var(--chart-4))" />
                <ColorSwatch name="Chart 5" color="hsl(var(--chart-5))" />
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Colors</CardTitle>
              <CardDescription>Navigation and sidebar specific colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <ColorSwatch name="Sidebar" color="hsl(var(--sidebar))" />
                <ColorSwatch name="Sidebar Foreground" color="hsl(var(--sidebar-foreground))" />
                <ColorSwatch name="Sidebar Primary" color="hsl(var(--sidebar-primary))" />
                <ColorSwatch name="Sidebar Primary Foreground" color="hsl(var(--sidebar-primary-foreground))" />
                <ColorSwatch name="Sidebar Accent" color="hsl(var(--sidebar-accent))" />
                <ColorSwatch name="Sidebar Accent Foreground" color="hsl(var(--sidebar-accent-foreground))" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Typography</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Font Families</CardTitle>
              <CardDescription>Inter font family</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <TypographyExample variant="font-sans" className="font-sans text-lg">
                  Inter - The quick brown fox jumps over the lazy dog
                </TypographyExample>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Sizes</CardTitle>
              <CardDescription>Available text size classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TypographyExample variant="text-xs" className="text-xs">
                Extra Small Text (text-xs)
              </TypographyExample>
              <TypographyExample variant="text-sm" className="text-sm">
                Small Text (text-sm)
              </TypographyExample>
              <TypographyExample variant="text-base" className="text-base">
                Base Text (text-base)
              </TypographyExample>
              <TypographyExample variant="text-lg" className="text-lg">
                Large Text (text-lg)
              </TypographyExample>
              <TypographyExample variant="text-xl" className="text-xl">
                Extra Large Text (text-xl)
              </TypographyExample>
              <TypographyExample variant="text-2xl" className="text-2xl">
                Two Extra Large Text (text-2xl)
              </TypographyExample>
              <TypographyExample variant="text-3xl" className="text-3xl">
                Three Extra Large Text (text-3xl)
              </TypographyExample>
              <TypographyExample variant="text-4xl" className="text-4xl">
                Four Extra Large Text (text-4xl)
              </TypographyExample>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
              <CardDescription>Available font weight classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TypographyExample variant="font-light" className="font-light text-lg">
                Light Weight (font-light)
              </TypographyExample>
              <TypographyExample variant="font-normal" className="font-normal text-lg">
                Normal Weight (font-normal)
              </TypographyExample>
              <TypographyExample variant="font-medium" className="font-medium text-lg">
                Medium Weight (font-medium)
              </TypographyExample>
              <TypographyExample variant="font-semibold" className="font-semibold text-lg">
                Semi Bold Weight (font-semibold)
              </TypographyExample>
              <TypographyExample variant="font-bold" className="font-bold text-lg">
                Bold Weight (font-bold)
              </TypographyExample>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Border Radius</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Radius Variants</CardTitle>
              <CardDescription>Available border radius values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Radius SM</div>
                  <div className="w-16 h-16 bg-primary rounded-sm"></div>
                  <div className="text-xs text-muted-foreground">rounded-sm</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Radius MD</div>
                  <div className="w-16 h-16 bg-primary rounded-md"></div>
                  <div className="text-xs text-muted-foreground">rounded-md</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Radius LG</div>
                  <div className="w-16 h-16 bg-primary rounded-lg"></div>
                  <div className="text-xs text-muted-foreground">rounded-lg</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Radius XL</div>
                  <div className="w-16 h-16 bg-primary rounded-xl"></div>
                  <div className="text-xs text-muted-foreground">rounded-xl</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Components</h2>
          
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm font-medium">Variants</div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm font-medium">Sizes</div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🔍</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">States</div>
                <div className="flex flex-wrap gap-2">
                  <Button disabled>Disabled</Button>
                  <Button aria-invalid>Invalid</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Card Components</CardTitle>
              <CardDescription>Card layout and structure components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is the card content area where your main content goes.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Card with Action</CardTitle>
                    <CardDescription>Card with action button</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content with an action button in the header.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Input and label components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invalid">Invalid Input</Label>
                <Input id="invalid" aria-invalid placeholder="Invalid input example" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" disabled placeholder="Disabled input" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Spacing</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>Tailwind CSS spacing values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-mono text-muted-foreground">
                      {size}
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="bg-primary rounded"
                        style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {size * 0.25}rem ({size * 4}px)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Shadows */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Shadows</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Shadow Variants</CardTitle>
              <CardDescription>Available shadow classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">No Shadow</div>
                  <div className="w-24 h-24 bg-card border rounded-lg"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shadow SM</div>
                  <div className="w-24 h-24 bg-card border rounded-lg shadow-sm"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shadow</div>
                  <div className="w-24 h-24 bg-card border rounded-lg shadow"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shadow MD</div>
                  <div className="w-24 h-24 bg-card border rounded-lg shadow-md"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shadow LG</div>
                  <div className="w-24 h-24 bg-card border rounded-lg shadow-lg"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shadow XL</div>
                  <div className="w-24 h-24 bg-card border rounded-lg shadow-xl"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
