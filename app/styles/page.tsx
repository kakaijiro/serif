import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StylesPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of colors, typography, spacing, and component variants used throughout the application.
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Color Palette</h2>
            <p className="text-muted-foreground">Light and dark mode color variables</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Mode Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Light Mode</CardTitle>
                <CardDescription>Color variables for light theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-background border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Background</div>
                      <div className="text-muted-foreground">--background</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Foreground</div>
                      <div className="text-muted-foreground">--foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-primary border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary</div>
                      <div className="text-muted-foreground">--primary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-primary-foreground border-2 border-border text-primary"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary Foreground</div>
                      <div className="text-muted-foreground">--primary-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-secondary border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary</div>
                      <div className="text-muted-foreground">--secondary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-secondary-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary Foreground</div>
                      <div className="text-muted-foreground">--secondary-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-muted border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted</div>
                      <div className="text-muted-foreground">--muted</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-muted-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted Foreground</div>
                      <div className="text-muted-foreground">--muted-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-accent border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Accent</div>
                      <div className="text-muted-foreground">--accent</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-accent-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Accent Foreground</div>
                      <div className="text-muted-foreground">--accent-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-destructive border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Destructive</div>
                      <div className="text-muted-foreground">--destructive</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-border border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Border</div>
                      <div className="text-muted-foreground">--border</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-input border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Input</div>
                      <div className="text-muted-foreground">--input</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-ring border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Ring</div>
                      <div className="text-muted-foreground">--ring</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark Mode Colors */}
            <Card className="dark:bg-card">
              <CardHeader>
                <CardTitle>Dark Mode</CardTitle>
                <CardDescription>Color variables for dark theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-background border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Background</div>
                      <div className="text-muted-foreground">--background</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Foreground</div>
                      <div className="text-muted-foreground">--foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-primary border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary</div>
                      <div className="text-muted-foreground">--primary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-primary-foreground border-2 border-border text-primary"></div>
                    <div className="text-sm">
                      <div className="font-medium">Primary Foreground</div>
                      <div className="text-muted-foreground">--primary-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-secondary border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary</div>
                      <div className="text-muted-foreground">--secondary</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-secondary-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Secondary Foreground</div>
                      <div className="text-muted-foreground">--secondary-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-muted border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted</div>
                      <div className="text-muted-foreground">--muted</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-muted-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Muted Foreground</div>
                      <div className="text-muted-foreground">--muted-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-accent border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Accent</div>
                      <div className="text-muted-foreground">--accent</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-accent-foreground border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Accent Foreground</div>
                      <div className="text-muted-foreground">--accent-foreground</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-destructive border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Destructive</div>
                      <div className="text-muted-foreground">--destructive</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-border border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Border</div>
                      <div className="text-muted-foreground">--border</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-input border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Input</div>
                      <div className="text-muted-foreground">--input</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-ring border-2 border-border"></div>
                    <div className="text-sm">
                      <div className="font-medium">Ring</div>
                      <div className="text-muted-foreground">--ring</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Chart Colors</CardTitle>
              <CardDescription>Color palette for data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-chart-1"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Chart 1</div>
                    <div className="text-muted-foreground">--chart-1</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-chart-2"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Chart 2</div>
                    <div className="text-muted-foreground">--chart-2</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-chart-3"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Chart 3</div>
                    <div className="text-muted-foreground">--chart-3</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-chart-4"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Chart 4</div>
                    <div className="text-muted-foreground">--chart-4</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-chart-5"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Chart 5</div>
                    <div className="text-muted-foreground">--chart-5</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Typography</h2>
            <p className="text-muted-foreground">Font families and text styles using Inter as the primary font</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Font Families</CardTitle>
              <CardDescription>Available font variables and their usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Font Variables</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">--font-sans</div>
                      <div className="text-muted-foreground">var(--font-inter)</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="font-medium">--font-mono</div>
                      <div className="text-muted-foreground">var(--font-inter)</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Text Styles</h3>
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight">Heading 1 (text-4xl font-bold tracking-tight)</h1>
                      <p className="text-muted-foreground">Large page titles and main headings</p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold">Heading 2 (text-3xl font-semibold)</h2>
                      <p className="text-muted-foreground">Section headers and important content</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Heading 3 (text-2xl font-semibold)</h3>
                      <p className="text-muted-foreground">Subsection headers</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Heading 4 (text-xl font-semibold)</h4>
                      <p className="text-muted-foreground">Component titles</p>
                    </div>
                    <div>
                      <p className="text-lg">Large text (text-lg)</p>
                      <p className="text-muted-foreground">Lead paragraphs and emphasis</p>
                    </div>
                    <div>
                      <p className="text-base">Base text (text-base)</p>
                      <p className="text-muted-foreground">Regular body text</p>
                    </div>
                    <div>
                      <p className="text-sm">Small text (text-sm)</p>
                      <p className="text-muted-foreground">Captions, labels, and secondary information</p>
                    </div>
                    <div>
                      <p className="text-xs">Extra small text (text-xs)</p>
                      <p className="text-muted-foreground">Tiny labels and metadata</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing & Layout */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Spacing & Layout</h2>
            <p className="text-muted-foreground">Consistent spacing scale and layout utilities</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>Tailwind CSS spacing utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-1 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">1 (0.25rem)</div>
                    <div className="text-muted-foreground">p-1, m-1, gap-1</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">2 (0.5rem)</div>
                    <div className="text-muted-foreground">p-2, m-2, gap-2</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">3 (0.75rem)</div>
                    <div className="text-muted-foreground">p-3, m-3, gap-3</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">4 (1rem)</div>
                    <div className="text-muted-foreground">p-4, m-4, gap-4</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">5 (1.25rem)</div>
                    <div className="text-muted-foreground">p-5, m-5, gap-5</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">6 (1.5rem)</div>
                    <div className="text-muted-foreground">p-6, m-6, gap-6</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">8 (2rem)</div>
                    <div className="text-muted-foreground">p-8, m-8, gap-8</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 bg-primary rounded"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">12 (3rem)</div>
                    <div className="text-muted-foreground">p-12, m-12, gap-12</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Variants */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Component Variants</h2>
            <p className="text-muted-foreground">Available variants for UI components</p>
          </div>
          
          {/* Button Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🔍</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Input fields and form elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-input">Default Input</Label>
                  <Input id="default-input" placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-input">Disabled Input</Label>
                  <Input id="disabled-input" placeholder="Disabled" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Card Components</CardTitle>
              <CardDescription>Card layout and structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is the main content area of the card.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Simple Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>A card with just header and content.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Avatar Component */}
          <Card>
            <CardHeader>
              <CardTitle>Avatar Component</CardTitle>
              <CardDescription>Avatar display with fallback support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Avatar Variants</h3>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/api/placeholder/64/64" alt="User avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-center">
                      <div className="font-medium">With Image</div>
                      <div className="text-muted-foreground">AvatarImage + Fallback</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-center">
                      <div className="font-medium">Fallback Only</div>
                      <div className="text-muted-foreground">Initials display</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-center">
                      <div className="font-medium">Small Size</div>
                      <div className="text-muted-foreground">h-12 w-12</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback>XL</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-center">
                      <div className="font-medium">Large Size</div>
                      <div className="text-muted-foreground">h-20 w-20</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Border Radius</h2>
            <p className="text-muted-foreground">Available border radius values</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Radius Scale</CardTitle>
              <CardDescription>Border radius variables and utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="h-16 bg-primary rounded-sm"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Small</div>
                    <div className="text-muted-foreground">rounded-sm</div>
                    <div className="text-xs text-muted-foreground">--radius-sm</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-primary rounded-md"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Medium</div>
                    <div className="text-muted-foreground">rounded-md</div>
                    <div className="text-xs text-muted-foreground">--radius-md</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-primary rounded-lg"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Large</div>
                    <div className="text-muted-foreground">rounded-lg</div>
                    <div className="text-xs text-muted-foreground">--radius-lg</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-primary rounded-xl"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Extra Large</div>
                    <div className="text-muted-foreground">rounded-xl</div>
                    <div className="text-xs text-muted-foreground">--radius-xl</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Shadows */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Shadows</h2>
            <p className="text-muted-foreground">Available shadow utilities</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Shadow Variants</CardTitle>
              <CardDescription>Shadow classes and their visual effects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow-sm"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow Small</div>
                    <div className="text-muted-foreground">shadow-sm</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow Default</div>
                    <div className="text-muted-foreground">shadow</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow-md"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow Medium</div>
                    <div className="text-muted-foreground">shadow-md</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow-lg"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow Large</div>
                    <div className="text-muted-foreground">shadow-lg</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow-xl"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow Extra Large</div>
                    <div className="text-muted-foreground">shadow-xl</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-background border rounded-lg shadow-2xl"></div>
                  <div className="text-sm text-center">
                    <div className="font-medium">Shadow 2XL</div>
                    <div className="text-muted-foreground">shadow-2xl</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CSS Variables */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">CSS Variables</h2>
            <p className="text-muted-foreground">All available CSS custom properties</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Variables</CardTitle>
              <CardDescription>Complete list of CSS custom properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Core Colors</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <code>--background</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--card</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--card-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--popover</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--popover-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--primary</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--primary-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--secondary</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--secondary-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--muted</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--muted-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--accent</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--accent-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--destructive</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--border</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--input</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--ring</code>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Additional Colors</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <code>--chart-1</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--chart-2</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--chart-3</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--chart-4</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--chart-5</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-primary</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-primary-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-accent</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-accent-foreground</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-border</code>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <code>--sidebar-ring</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
