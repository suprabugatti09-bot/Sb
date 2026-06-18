import { Router } from "express";

const router = Router();

const VALID_KEYS = [
  "JXJ-A3K7-QP21", "JXJ-B8M2-XR54", "JXJ-C1N9-LT87", "JXJ-D4W6-ZV30",
  "JXJ-E7F3-MK65", "JXJ-F2H8-YN98", "JXJ-G5J1-WS43", "JXJ-H9K4-UC76",
  "JXJ-I6L7-PD09", "JXJ-J0M2-RE32", "JXJ-K3N5-SB68", "JXJ-L8P0-TA91",
  "JXJ-M1Q4-VF24", "JXJ-N6R9-XG57", "JXJ-O2S3-YH80", "JXJ-P7T8-ZI13",
  "JXJ-Q4U1-AJ46", "JXJ-R9V6-BK79", "JXJ-S3W2-CL02", "JXJ-T8X7-DM35",
  "JXJ-U1Y0-EN68", "JXJ-V6Z5-FO91", "JXJ-W2A9-GP24", "JXJ-X7B4-HQ57",
  "JXJ-Y0C8-IR80", "JXJ-Z5D3-JS13", "JXJ-AA4E-KT46", "JXJ-BB9F-LU79",
  "JXJ-CC2G-MV02", "JXJ-DD7H-NW35",
];

const luaScript = `
-- JEAN X JAY KEY SYSTEM
-- discord: jean14_17

local ValidKeys = {${VALID_KEYS.map(k => `\n  "${k}",`).join("")}
}

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

-- Remove old GUI if exists
if PlayerGui:FindFirstChild("JXJKeySystem") then
  PlayerGui.JXJKeySystem:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JXJKeySystem"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Background blur
local Blur = Instance.new("Frame")
Blur.Size = UDim2.new(1, 0, 1, 0)
Blur.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
Blur.BackgroundTransparency = 0.4
Blur.ZIndex = 1
Blur.Parent = ScreenGui

-- Main frame
local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 420, 0, 230)
Frame.Position = UDim2.new(0.5, -210, 0.5, -115)
Frame.BackgroundColor3 = Color3.fromRGB(10, 10, 10)
Frame.BorderSizePixel = 0
Frame.ZIndex = 2
Frame.Parent = ScreenGui

-- Gold top bar
local TopBar = Instance.new("Frame")
TopBar.Size = UDim2.new(1, 0, 0, 4)
TopBar.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
TopBar.BorderSizePixel = 0
TopBar.ZIndex = 3
TopBar.Parent = Frame

-- Title
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 55)
Title.Position = UDim2.new(0, 0, 0, 4)
Title.BackgroundTransparency = 1
Title.Text = "JEAN X JAY"
Title.TextColor3 = Color3.fromRGB(245, 197, 24)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 24
Title.ZIndex = 3
Title.Parent = Frame

local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, 0, 0, 20)
Sub.Position = UDim2.new(0, 0, 0, 55)
Sub.BackgroundTransparency = 1
Sub.Text = "KEY SYSTEM — Ingresa tu key de acceso"
Sub.TextColor3 = Color3.fromRGB(100, 100, 100)
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 12
Sub.ZIndex = 3
Sub.Parent = Frame

-- Input
local InputBox = Instance.new("TextBox")
InputBox.Size = UDim2.new(0, 380, 0, 42)
InputBox.Position = UDim2.new(0, 20, 0, 90)
InputBox.PlaceholderText = "JXJ-XXXX-XXXX"
InputBox.Text = ""
InputBox.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
InputBox.BorderSizePixel = 0
InputBox.TextColor3 = Color3.fromRGB(245, 197, 24)
InputBox.PlaceholderColor3 = Color3.fromRGB(60, 60, 60)
InputBox.Font = Enum.Font.Code
InputBox.TextSize = 16
InputBox.ClearTextOnFocus = false
InputBox.ZIndex = 3
InputBox.Parent = Frame

local InputCorner = Instance.new("UICorner")
InputCorner.CornerRadius = UDim.new(0, 4)
InputCorner.Parent = InputBox

-- Verify button
local Button = Instance.new("TextButton")
Button.Size = UDim2.new(0, 380, 0, 42)
Button.Position = UDim2.new(0, 20, 0, 148)
Button.Text = "VERIFICAR KEY"
Button.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
Button.TextColor3 = Color3.fromRGB(0, 0, 0)
Button.Font = Enum.Font.GothamBold
Button.TextSize = 15
Button.BorderSizePixel = 0
Button.ZIndex = 3
Button.Parent = Frame

local BtnCorner = Instance.new("UICorner")
BtnCorner.CornerRadius = UDim.new(0, 4)
BtnCorner.Parent = Button

-- Status label
local Status = Instance.new("TextLabel")
Status.Size = UDim2.new(1, 0, 0, 24)
Status.Position = UDim2.new(0, 0, 0, 198)
Status.BackgroundTransparency = 1
Status.Text = ""
Status.TextColor3 = Color3.fromRGB(255, 80, 80)
Status.Font = Enum.Font.GothamBold
Status.TextSize = 12
Status.ZIndex = 3
Status.Parent = Frame

local function isValidKey(k)
  for _, v in ipairs(ValidKeys) do
    if v == k:upper():gsub("%s+", "") then
      return true
    end
  end
  return false
end

Button.MouseButton1Click:Connect(function()
  local key = InputBox.Text
  if isValidKey(key) then
    Status.TextColor3 = Color3.fromRGB(0, 214, 79)
    Status.Text = "Key válida — cargando script..."
    Button.Text = "✓ ACCESO CONCEDIDO"
    Button.BackgroundColor3 = Color3.fromRGB(0, 180, 60)
    task.wait(1.2)
    ScreenGui:Destroy()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/mateoyandi02-droid/Script/refs/heads/main/Whitelist%20Acusado"))()
  else
    Status.Text = "Key incorrecta. Contacta a @jean14_17 en Discord."
    Button.Text = "✗ KEY INVÁLIDA"
    Button.BackgroundColor3 = Color3.fromRGB(200, 30, 30)
    task.wait(2)
    Button.Text = "VERIFICAR KEY"
    Button.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
    Status.Text = ""
  end
end)
`;

const loaderScript = `
-- JEAN CHEAT X JAY CHEAT
-- Loader Script

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JXJLoader") then
  PlayerGui.JXJLoader:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JXJLoader"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Dark overlay
local Overlay = Instance.new("Frame")
Overlay.Size = UDim2.new(1, 0, 1, 0)
Overlay.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
Overlay.BackgroundTransparency = 0.3
Overlay.ZIndex = 1
Overlay.Parent = ScreenGui

-- Main card
local Card = Instance.new("Frame")
Card.Size = UDim2.new(0, 460, 0, 260)
Card.Position = UDim2.new(0.5, -230, 0.5, -130)
Card.BackgroundColor3 = Color3.fromRGB(8, 8, 8)
Card.BorderSizePixel = 0
Card.ZIndex = 2
Card.Parent = ScreenGui

local CardCorner = Instance.new("UICorner")
CardCorner.CornerRadius = UDim.new(0, 8)
CardCorner.Parent = Card

-- Gold accent top
local GoldBar = Instance.new("Frame")
GoldBar.Size = UDim2.new(1, 0, 0, 5)
GoldBar.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
GoldBar.BorderSizePixel = 0
GoldBar.ZIndex = 3
GoldBar.Parent = Card

local GoldCorner = Instance.new("UICorner")
GoldCorner.CornerRadius = UDim.new(0, 8)
GoldCorner.Parent = GoldBar

-- "JEAN CHEAT" line 1
local Line1 = Instance.new("TextLabel")
Line1.Size = UDim2.new(1, 0, 0, 70)
Line1.Position = UDim2.new(0, 0, 0, 14)
Line1.BackgroundTransparency = 1
Line1.Text = "JEAN CHEAT"
Line1.TextColor3 = Color3.fromRGB(255, 255, 255)
Line1.Font = Enum.Font.GothamBold
Line1.TextSize = 42
Line1.ZIndex = 3
Line1.Parent = Card

-- "X" separator
local LineX = Instance.new("TextLabel")
LineX.Size = UDim2.new(1, 0, 0, 30)
LineX.Position = UDim2.new(0, 0, 0, 80)
LineX.BackgroundTransparency = 1
LineX.Text = "✦  X  ✦"
LineX.TextColor3 = Color3.fromRGB(245, 197, 24)
LineX.Font = Enum.Font.GothamBold
LineX.TextSize = 18
LineX.ZIndex = 3
LineX.Parent = Card

-- "JAY CHEAT" line 2
local Line2 = Instance.new("TextLabel")
Line2.Size = UDim2.new(1, 0, 0, 55)
Line2.Position = UDim2.new(0, 0, 0, 106)
Line2.BackgroundTransparency = 1
Line2.Text = "JAY CHEAT"
Line2.TextColor3 = Color3.fromRGB(245, 197, 24)
Line2.Font = Enum.Font.GothamBold
Line2.TextSize = 42
Line2.ZIndex = 3
Line2.Parent = Card

-- Status text
local StatusLabel = Instance.new("TextLabel")
StatusLabel.Size = UDim2.new(1, 0, 0, 22)
StatusLabel.Position = UDim2.new(0, 0, 0, 168)
StatusLabel.BackgroundTransparency = 1
StatusLabel.Text = "Iniciando..."
StatusLabel.TextColor3 = Color3.fromRGB(130, 130, 130)
StatusLabel.Font = Enum.Font.Gotham
StatusLabel.TextSize = 13
StatusLabel.ZIndex = 3
StatusLabel.Parent = Card

-- Progress bar track
local BarTrack = Instance.new("Frame")
BarTrack.Size = UDim2.new(0, 400, 0, 8)
BarTrack.Position = UDim2.new(0, 30, 0, 200)
BarTrack.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
BarTrack.BorderSizePixel = 0
BarTrack.ZIndex = 3
BarTrack.Parent = Card

local TrackCorner = Instance.new("UICorner")
TrackCorner.CornerRadius = UDim.new(1, 0)
TrackCorner.Parent = BarTrack

-- Progress bar fill
local BarFill = Instance.new("Frame")
BarFill.Size = UDim2.new(0, 0, 1, 0)
BarFill.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
BarFill.BorderSizePixel = 0
BarFill.ZIndex = 4
BarFill.Parent = BarTrack

local FillCorner = Instance.new("UICorner")
FillCorner.CornerRadius = UDim.new(1, 0)
FillCorner.Parent = BarFill

-- Version label bottom
local VersionLabel = Instance.new("TextLabel")
VersionLabel.Size = UDim2.new(1, 0, 0, 20)
VersionLabel.Position = UDim2.new(0, 0, 0, 234)
VersionLabel.BackgroundTransparency = 1
VersionLabel.Text = "v1.0  |  discord: jean14_17  |  @jayxxx047"
VersionLabel.TextColor3 = Color3.fromRGB(55, 55, 55)
VersionLabel.Font = Enum.Font.Gotham
VersionLabel.TextSize = 11
VersionLabel.ZIndex = 3
VersionLabel.Parent = Card

-- Animate loading bar
local steps = {
  {pct = 0.25, text = "Cargando recursos...",   delay = 0.6},
  {pct = 0.55, text = "Verificando acceso...",  delay = 0.7},
  {pct = 0.80, text = "Preparando script...",   delay = 0.5},
  {pct = 1.00, text = "Listo!",                 delay = 0.4},
}

for _, step in ipairs(steps) do
  StatusLabel.Text = step.text
  local tween = TweenService:Create(
    BarFill,
    TweenInfo.new(step.delay, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
    {Size = UDim2.new(step.pct, 0, 1, 0)}
  )
  tween:Play()
  tween.Completed:Wait()
end

task.wait(0.3)
ScreenGui:Destroy()
loadstring(game:HttpGet("https://raw.githubusercontent.com/mateoyandi02-droid/Script/refs/heads/main/Whitelist%20Acusado"))()
`;

router.get("/script", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(luaScript);
});

const jxjScript = `
-- JEAN Script Hub
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JEANHub") then
  PlayerGui.JEANHub:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEANHub"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Card
local Card = Instance.new("Frame")
Card.Size = UDim2.new(0, 280, 0, 64)
Card.Position = UDim2.new(0.5, -140, 0, -80)
Card.BackgroundColor3 = Color3.fromRGB(8, 8, 8)
Card.BorderSizePixel = 0
Card.ZIndex = 10
Card.Parent = ScreenGui

local CardCorner = Instance.new("UICorner")
CardCorner.CornerRadius = UDim.new(0, 8)
CardCorner.Parent = Card

-- Gold left accent bar
local GoldAccent = Instance.new("Frame")
GoldAccent.Size = UDim2.new(0, 4, 1, 0)
GoldAccent.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
GoldAccent.BorderSizePixel = 0
GoldAccent.ZIndex = 11
GoldAccent.Parent = Card

local AccentCorner = Instance.new("UICorner")
AccentCorner.CornerRadius = UDim.new(0, 8)
AccentCorner.Parent = GoldAccent

-- Main name "JEAN"
local NameLabel = Instance.new("TextLabel")
NameLabel.Size = UDim2.new(1, -14, 0, 36)
NameLabel.Position = UDim2.new(0, 14, 0, 4)
NameLabel.BackgroundTransparency = 1
NameLabel.Text = "JEAN"
NameLabel.TextColor3 = Color3.fromRGB(245, 197, 24)
NameLabel.Font = Enum.Font.GothamBold
NameLabel.TextSize = 28
NameLabel.TextXAlignment = Enum.TextXAlignment.Left
NameLabel.ZIndex = 11
NameLabel.Parent = Card

-- Subtitle
local SubLabel = Instance.new("TextLabel")
SubLabel.Size = UDim2.new(1, -14, 0, 20)
SubLabel.Position = UDim2.new(0, 14, 0, 38)
SubLabel.BackgroundTransparency = 1
SubLabel.Text = "Script Hub  |  by Jean"
SubLabel.TextColor3 = Color3.fromRGB(90, 90, 90)
SubLabel.Font = Enum.Font.Gotham
SubLabel.TextSize = 12
SubLabel.TextXAlignment = Enum.TextXAlignment.Left
SubLabel.ZIndex = 11
SubLabel.Parent = Card

-- Animation runs in background, does NOT block script execution
task.spawn(function()
  -- Slide in from top
  local tweenIn = TweenService:Create(
    Card,
    TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
    {Position = UDim2.new(0.5, -140, 0, 12)}
  )
  tweenIn:Play()
  tweenIn.Completed:Wait()

  task.wait(2.5)

  -- Slide out
  local tweenOut = TweenService:Create(
    Card,
    TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In),
    {Position = UDim2.new(0.5, -140, 0, -90)}
  )
  tweenOut:Play()
  tweenOut.Completed:Wait()
  ScreenGui:Destroy()
end)

-- Execute original script immediately, no waiting
loadstring(game:HttpGet("https://raw.githubusercontent.com/mateoyandi02-droid/Script/refs/heads/main/Whitelist%20Acusado"))()
`;

router.get("/script", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(luaScript);
});

router.get("/loader", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(loaderScript);
});

router.get("/jxj", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(jxjScript);
});

const JEAN_KEYS = [
  "JEAN101","JEAN202","JEAN303","JEAN404","JEAN505",
  "JEAN606","JEAN707","JEAN808","JEAN909","JEAN939",
  "JEAN112","JEAN223","JEAN334","JEAN445","JEAN556",
  "JEAN667","JEAN778","JEAN889","JEAN990","JEAN119",
  "JEAN228","JEAN337","JEAN446","JEAN557","JEAN668",
  "JEAN779","JEAN880","JEAN991","JEAN113","JEAN224",
  "JEAN335","JEAN448","JEAN559","JEAN662","JEAN771",
  "JEAN882","JEAN993","JEAN114","JEAN225","JEAN336",
  "JEAN447","JEAN558","JEAN669","JEAN770","JEAN881",
  "JEAN992","JEAN115","JEAN226","JEAN338","JEAN449",
];

const jeanKeyScript = `
-- JEAN Hub
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JEANHub") then
  PlayerGui.JEANHub:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEANHub"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Hub panel
local Hub = Instance.new("Frame")
Hub.Size = UDim2.new(0, 280, 0, 160)
Hub.Position = UDim2.new(0, 16, 0.5, -80)
Hub.BackgroundColor3 = Color3.fromRGB(10, 10, 14)
Hub.BorderSizePixel = 0
Hub.ZIndex = 10
Hub.Parent = ScreenGui

local HubCorner = Instance.new("UICorner")
HubCorner.CornerRadius = UDim.new(0, 10)
HubCorner.Parent = Hub

-- Gold left bar
local Accent = Instance.new("Frame")
Accent.Size = UDim2.new(0, 4, 1, 0)
Accent.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
Accent.BorderSizePixel = 0
Accent.ZIndex = 11
Accent.Parent = Hub

local AccentCorner = Instance.new("UICorner")
AccentCorner.CornerRadius = UDim.new(0, 10)
AccentCorner.Parent = Accent

-- Title
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, -16, 0, 38)
Title.Position = UDim2.new(0, 16, 0, 4)
Title.BackgroundTransparency = 1
Title.Text = "JEAN"
Title.TextColor3 = Color3.fromRGB(245, 197, 24)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 30
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.ZIndex = 11
Title.Parent = Hub

-- Status label
local StatusLabel = Instance.new("TextLabel")
StatusLabel.Size = UDim2.new(1, -16, 0, 18)
StatusLabel.Position = UDim2.new(0, 16, 0, 40)
StatusLabel.BackgroundTransparency = 1
StatusLabel.Text = "Cargando script..."
StatusLabel.TextColor3 = Color3.fromRGB(80, 80, 80)
StatusLabel.Font = Enum.Font.Gotham
StatusLabel.TextSize = 11
StatusLabel.TextXAlignment = Enum.TextXAlignment.Left
StatusLabel.ZIndex = 11
StatusLabel.Parent = Hub

-- Divider
local Divider = Instance.new("Frame")
Divider.Size = UDim2.new(1, -20, 0, 1)
Divider.Position = UDim2.new(0, 10, 0, 66)
Divider.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
Divider.BorderSizePixel = 0
Divider.ZIndex = 11
Divider.Parent = Hub

-- AUTO FARM VIP button
local FarmBtn = Instance.new("TextButton")
FarmBtn.Size = UDim2.new(1, -20, 0, 40)
FarmBtn.Position = UDim2.new(0, 10, 0, 76)
FarmBtn.Text = "AUTO FARM VIP"
FarmBtn.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
FarmBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
FarmBtn.Font = Enum.Font.GothamBold
FarmBtn.TextSize = 14
FarmBtn.BorderSizePixel = 0
FarmBtn.ZIndex = 11
FarmBtn.Parent = Hub

local FarmCorner = Instance.new("UICorner")
FarmCorner.CornerRadius = UDim.new(0, 6)
FarmCorner.Parent = FarmBtn

-- Farm status
local FarmStatus = Instance.new("TextLabel")
FarmStatus.Size = UDim2.new(1, -16, 0, 18)
FarmStatus.Position = UDim2.new(0, 16, 0, 122)
FarmStatus.BackgroundTransparency = 1
FarmStatus.Text = ""
FarmStatus.TextColor3 = Color3.fromRGB(0, 210, 80)
FarmStatus.Font = Enum.Font.Gotham
FarmStatus.TextSize = 11
FarmStatus.TextXAlignment = Enum.TextXAlignment.Left
FarmStatus.ZIndex = 11
FarmStatus.Parent = Hub

-- Drag functionality
local dragging, dragStart, startPos
Hub.InputBegan:Connect(function(input)
  if input.UserInputType == Enum.UserInputType.MouseButton1 then
    dragging = true
    dragStart = input.Position
    startPos = Hub.Position
  end
end)
Hub.InputChanged:Connect(function(input)
  if dragging and input.UserInputType == Enum.UserInputType.MouseMovement then
    local delta = input.Position - dragStart
    Hub.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
  end
end)
Hub.InputEnded:Connect(function(input)
  if input.UserInputType == Enum.UserInputType.MouseButton1 then dragging = false end
end)

-- Execute main script immediately
task.spawn(function()
  local ok = pcall(function()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/mateoyandi02-droid/Script/refs/heads/main/Whitelist%20Acusado"))()
  end)
  if ok then
    StatusLabel.Text = "Script activo"
    StatusLabel.TextColor3 = Color3.fromRGB(0, 210, 80)
  else
    StatusLabel.Text = "Error al cargar"
    StatusLabel.TextColor3 = Color3.fromRGB(255, 70, 70)
  end
end)

-- AUTO FARM VIP button click
FarmBtn.MouseButton1Click:Connect(function()
  FarmBtn.Text = "ACTIVANDO..."
  FarmBtn.BackgroundColor3 = Color3.fromRGB(180, 140, 0)
  task.spawn(function()
    loadstring(game:HttpGet("https://js-store-lime.vercel.app/api/raw?file=AUTO_MS_FULLY_VEH_FULLY_CHAR"))()
    FarmStatus.Text = "Auto Farm VIP activo"
    FarmBtn.Text = "AUTO FARM VIP ✓"
    FarmBtn.BackgroundColor3 = Color3.fromRGB(0, 180, 60)
  end)
end)
`;

const jxjFarmScript = `
-- JEAN X JAY
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JXJFarm") then
  PlayerGui.JXJFarm:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JXJFarm"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Card
local Card = Instance.new("Frame")
Card.Size = UDim2.new(0, 360, 0, 180)
Card.Position = UDim2.new(0.5, -180, 0.5, -90)
Card.BackgroundColor3 = Color3.fromRGB(8, 8, 8)
Card.BorderSizePixel = 0
Card.ZIndex = 10
Card.Parent = ScreenGui

local CardCorner = Instance.new("UICorner")
CardCorner.CornerRadius = UDim.new(0, 10)
CardCorner.Parent = Card

-- Gold top bar
local TopBar = Instance.new("Frame")
TopBar.Size = UDim2.new(1, 0, 0, 4)
TopBar.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
TopBar.BorderSizePixel = 0
TopBar.ZIndex = 11
TopBar.Parent = Card

local TopCorner = Instance.new("UICorner")
TopCorner.CornerRadius = UDim.new(0, 10)
TopCorner.Parent = TopBar

-- JEAN title
local Jean = Instance.new("TextLabel")
Jean.Size = UDim2.new(0.5, 0, 0, 60)
Jean.Position = UDim2.new(0, 0, 0, 6)
Jean.BackgroundTransparency = 1
Jean.Text = "JEAN"
Jean.TextColor3 = Color3.fromRGB(255, 255, 255)
Jean.Font = Enum.Font.GothamBold
Jean.TextSize = 38
Jean.ZIndex = 11
Jean.Parent = Card

-- X
local X = Instance.new("TextLabel")
X.Size = UDim2.new(0, 30, 0, 60)
X.Position = UDim2.new(0.5, -15, 0, 6)
X.BackgroundTransparency = 1
X.Text = "X"
X.TextColor3 = Color3.fromRGB(245, 197, 24)
X.Font = Enum.Font.GothamBold
X.TextSize = 28
X.ZIndex = 11
X.Parent = Card

-- JAY title
local Jay = Instance.new("TextLabel")
Jay.Size = UDim2.new(0.5, 0, 0, 60)
Jay.Position = UDim2.new(0.5, 0, 0, 6)
Jay.BackgroundTransparency = 1
Jay.Text = "JAY"
Jay.TextColor3 = Color3.fromRGB(245, 197, 24)
Jay.Font = Enum.Font.GothamBold
Jay.TextSize = 38
Jay.ZIndex = 11
Jay.Parent = Card

-- Divider
local Div = Instance.new("Frame")
Div.Size = UDim2.new(1, -20, 0, 1)
Div.Position = UDim2.new(0, 10, 0, 72)
Div.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
Div.BorderSizePixel = 0
Div.ZIndex = 11
Div.Parent = Card

-- Progress bar track
local BarTrack = Instance.new("Frame")
BarTrack.Size = UDim2.new(1, -20, 0, 6)
BarTrack.Position = UDim2.new(0, 10, 0, 82)
BarTrack.BackgroundColor3 = Color3.fromRGB(22, 22, 22)
BarTrack.BorderSizePixel = 0
BarTrack.ZIndex = 11
BarTrack.Parent = Card

local TrackCorner = Instance.new("UICorner")
TrackCorner.CornerRadius = UDim.new(1, 0)
TrackCorner.Parent = BarTrack

local BarFill = Instance.new("Frame")
BarFill.Size = UDim2.new(0, 0, 1, 0)
BarFill.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
BarFill.BorderSizePixel = 0
BarFill.ZIndex = 12
BarFill.Parent = BarTrack

local FillCorner = Instance.new("UICorner")
FillCorner.CornerRadius = UDim.new(1, 0)
FillCorner.Parent = BarFill

-- Status
local Status = Instance.new("TextLabel")
Status.Size = UDim2.new(1, -20, 0, 20)
Status.Position = UDim2.new(0, 10, 0, 96)
Status.BackgroundTransparency = 1
Status.Text = "Iniciando..."
Status.TextColor3 = Color3.fromRGB(100, 100, 100)
Status.Font = Enum.Font.Gotham
Status.TextSize = 12
Status.TextXAlignment = Enum.TextXAlignment.Left
Status.ZIndex = 11
Status.Parent = Card

-- Footer
local Footer = Instance.new("TextLabel")
Footer.Size = UDim2.new(1, -20, 0, 16)
Footer.Position = UDim2.new(0, 10, 0, 156)
Footer.BackgroundTransparency = 1
Footer.Text = "discord: jean14_17  |  @jayxxx047"
Footer.TextColor3 = Color3.fromRGB(40, 40, 40)
Footer.Font = Enum.Font.Gotham
Footer.TextSize = 10
Footer.TextXAlignment = Enum.TextXAlignment.Center
Footer.ZIndex = 11
Footer.Parent = Card

-- Animate bar and load script
task.spawn(function()
  local steps = {
    {pct = 0.3, text = "Cargando recursos...", t = 0.5},
    {pct = 0.7, text = "Saltando verificacion...", t = 0.6},
    {pct = 1.0, text = "Ejecutando script...", t = 0.4},
  }
  for _, s in ipairs(steps) do
    Status.Text = s.text
    TweenService:Create(BarFill, TweenInfo.new(s.t, Enum.EasingStyle.Quad), {Size = UDim2.new(s.pct, 0, 1, 0)}):Play()
    task.wait(s.t + 0.1)
  end
  task.wait(0.3)
  ScreenGui:Destroy()
  loadstring(game:HttpGet("https://js-store-lime.vercel.app/api/raw?file=AUTO_MS_FULLY_VEH_FULLY_CHAR"))()
end)
`;

router.get("/jean", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(jeanKeyScript);
});

const jeanIosScript = `
-- JEAN_IOS Hub v2.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JEAN_IOS_HUB") then
  PlayerGui.JEAN_IOS_HUB:Destroy()
end

local savedKey = ""
pcall(function()
  if isfile and isfile("JEAN_IOS.json") then
    local data = HttpService:JSONDecode(readfile("JEAN_IOS.json"))
    savedKey = data.key or ""
  end
end)

-- ScreenGui
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEAN_IOS_HUB"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Dark overlay
local Overlay = Instance.new("Frame")
Overlay.Size = UDim2.new(1,0,1,0)
Overlay.BackgroundColor3 = Color3.fromRGB(0,0,0)
Overlay.BackgroundTransparency = 0.45
Overlay.ZIndex = 10
Overlay.Parent = ScreenGui

-- ── Main window ──────────────────────────────────────────
local Win = Instance.new("Frame")
Win.Size = UDim2.new(0, 460, 0, 290)
Win.Position = UDim2.new(0.5, -230, 0.5, -145)
Win.BackgroundColor3 = Color3.fromRGB(30, 30, 35)
Win.BorderSizePixel = 0
Win.ZIndex = 11
Win.ClipsDescendants = true
Win.Parent = ScreenGui

local WinCorner = Instance.new("UICorner")
WinCorner.CornerRadius = UDim.new(0, 10)
WinCorner.Parent = Win

-- ── Title bar (like the hub screenshot) ──────────────────
local TitleBar = Instance.new("Frame")
TitleBar.Size = UDim2.new(1, 0, 0, 42)
TitleBar.BackgroundColor3 = Color3.fromRGB(22, 22, 27)
TitleBar.BorderSizePixel = 0
TitleBar.ZIndex = 12
TitleBar.Parent = Win

-- Icon circle
local IconCircle = Instance.new("Frame")
IconCircle.Size = UDim2.new(0, 28, 0, 28)
IconCircle.Position = UDim2.new(0, 8, 0.5, -14)
IconCircle.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
IconCircle.BorderSizePixel = 0
IconCircle.ZIndex = 13
IconCircle.Parent = TitleBar

local IconCorner = Instance.new("UICorner")
IconCorner.CornerRadius = UDim.new(1, 0)
IconCorner.Parent = IconCircle

local IconLabel = Instance.new("TextLabel")
IconLabel.Size = UDim2.new(1,0,1,0)
IconLabel.BackgroundTransparency = 1
IconLabel.Text = "J"
IconLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
IconLabel.Font = Enum.Font.GothamBold
IconLabel.TextSize = 16
IconLabel.ZIndex = 14
IconLabel.Parent = IconCircle

-- Hub title text
local TitleText = Instance.new("TextLabel")
TitleText.Size = UDim2.new(1, -50, 1, 0)
TitleText.Position = UDim2.new(0, 44, 0, 0)
TitleText.BackgroundTransparency = 1
TitleText.Text = "JEAN_IOS  -  Premium Hub"
TitleText.TextColor3 = Color3.fromRGB(220, 220, 220)
TitleText.Font = Enum.Font.GothamBold
TitleText.TextSize = 14
TitleText.TextXAlignment = Enum.TextXAlignment.Left
TitleText.ZIndex = 13
TitleText.Parent = TitleBar

-- Minimize button (decorative dash)
local MinBtn = Instance.new("TextLabel")
MinBtn.Size = UDim2.new(0, 28, 0, 28)
MinBtn.Position = UDim2.new(1, -36, 0.5, -14)
MinBtn.BackgroundColor3 = Color3.fromRGB(50, 50, 58)
MinBtn.BorderSizePixel = 0
MinBtn.Text = "−"
MinBtn.TextColor3 = Color3.fromRGB(180, 180, 180)
MinBtn.Font = Enum.Font.GothamBold
MinBtn.TextSize = 18
MinBtn.ZIndex = 13
MinBtn.Parent = TitleBar

local MinCorner = Instance.new("UICorner")
MinCorner.CornerRadius = UDim.new(0, 6)
MinCorner.Parent = MinBtn

-- Thin accent line under title bar
local Accent = Instance.new("Frame")
Accent.Size = UDim2.new(1, 0, 0, 2)
Accent.Position = UDim2.new(0, 0, 0, 42)
Accent.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
Accent.BorderSizePixel = 0
Accent.ZIndex = 12
Accent.Parent = Win

-- ── Body ─────────────────────────────────────────────────
local Body = Instance.new("Frame")
Body.Size = UDim2.new(1, 0, 1, -44)
Body.Position = UDim2.new(0, 0, 0, 44)
Body.BackgroundTransparency = 1
Body.ZIndex = 12
Body.Parent = Win

-- Section label
local SectionLabel = Instance.new("TextLabel")
SectionLabel.Size = UDim2.new(1, -30, 0, 20)
SectionLabel.Position = UDim2.new(0, 15, 0, 18)
SectionLabel.BackgroundTransparency = 1
SectionLabel.Text = "🔑  ACTIVACION DE LICENCIA"
SectionLabel.TextColor3 = Color3.fromRGB(140, 140, 150)
SectionLabel.Font = Enum.Font.GothamBold
SectionLabel.TextSize = 11
SectionLabel.TextXAlignment = Enum.TextXAlignment.Left
SectionLabel.ZIndex = 13
SectionLabel.Parent = Body

-- Input background (like hub row)
local InputBg = Instance.new("Frame")
InputBg.Size = UDim2.new(1, -30, 0, 46)
InputBg.Position = UDim2.new(0, 15, 0, 44)
InputBg.BackgroundColor3 = Color3.fromRGB(22, 22, 27)
InputBg.BorderSizePixel = 0
InputBg.ZIndex = 13
InputBg.Parent = Body

local InputBgCorner = Instance.new("UICorner")
InputBgCorner.CornerRadius = UDim.new(0, 7)
InputBgCorner.Parent = InputBg

-- Left accent bar on input
local InputAccent = Instance.new("Frame")
InputAccent.Size = UDim2.new(0, 3, 1, 0)
InputAccent.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
InputAccent.BorderSizePixel = 0
InputAccent.ZIndex = 14
InputAccent.Parent = InputBg

local InputAccentCorner = Instance.new("UICorner")
InputAccentCorner.CornerRadius = UDim.new(0, 3)
InputAccentCorner.Parent = InputAccent

-- Actual TextBox
local Input = Instance.new("TextBox")
Input.Size = UDim2.new(1, -18, 1, 0)
Input.Position = UDim2.new(0, 14, 0, 0)
Input.PlaceholderText = "Ingresa tu key  (JEAN-XXXX-XXXX)"
Input.Text = savedKey
Input.BackgroundTransparency = 1
Input.BorderSizePixel = 0
Input.TextColor3 = Color3.fromRGB(230, 230, 230)
Input.PlaceholderColor3 = Color3.fromRGB(90, 90, 100)
Input.Font = Enum.Font.GothamBold
Input.TextSize = 15
Input.ClearTextOnFocus = false
Input.TextXAlignment = Enum.TextXAlignment.Left
Input.ZIndex = 14
Input.Parent = InputBg

-- Status row
local StatusText = Instance.new("TextLabel")
StatusText.Size = UDim2.new(1, -30, 0, 18)
StatusText.Position = UDim2.new(0, 15, 0, 96)
StatusText.BackgroundTransparency = 1
StatusText.Text = ""
StatusText.TextColor3 = Color3.fromRGB(255, 80, 80)
StatusText.Font = Enum.Font.Gotham
StatusText.TextSize = 12
StatusText.TextXAlignment = Enum.TextXAlignment.Left
StatusText.ZIndex = 13
StatusText.Parent = Body

-- ── Verify button (full-width hub style) ─────────────────
local VerifyBtn = Instance.new("TextButton")
VerifyBtn.Size = UDim2.new(1, -30, 0, 44)
VerifyBtn.Position = UDim2.new(0, 15, 0, 120)
VerifyBtn.Text = "▶   VERIFICAR Y EJECUTAR"
VerifyBtn.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
VerifyBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
VerifyBtn.Font = Enum.Font.GothamBold
VerifyBtn.TextSize = 14
VerifyBtn.BorderSizePixel = 0
VerifyBtn.ZIndex = 13
VerifyBtn.Parent = Body

local VBtnCorner = Instance.new("UICorner")
VBtnCorner.CornerRadius = UDim.new(0, 7)
VBtnCorner.Parent = VerifyBtn

-- Bottom info strip
local InfoStrip = Instance.new("Frame")
InfoStrip.Size = UDim2.new(1, 0, 0, 32)
InfoStrip.Position = UDim2.new(0, 0, 1, -32)
InfoStrip.BackgroundColor3 = Color3.fromRGB(22, 22, 27)
InfoStrip.BorderSizePixel = 0
InfoStrip.ZIndex = 12
InfoStrip.Parent = Win

local InfoText = Instance.new("TextLabel")
InfoText.Size = UDim2.new(1, -20, 1, 0)
InfoText.Position = UDim2.new(0, 10, 0, 0)
InfoText.BackgroundTransparency = 1
InfoText.Text = "JEAN_IOS Hub  •  discord.gg/9RaGs3cpH"
InfoText.TextColor3 = Color3.fromRGB(80, 80, 90)
InfoText.Font = Enum.Font.Gotham
InfoText.TextSize = 11
InfoText.TextXAlignment = Enum.TextXAlignment.Left
InfoText.ZIndex = 13
InfoText.Parent = InfoStrip

-- ── Slide-in animation ───────────────────────────────────
task.spawn(function()
  Win.Position = UDim2.new(0.5, -230, 0.5, -110)
  Win.BackgroundTransparency = 1
  local tween = TweenService:Create(Win,
    TweenInfo.new(0.3, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
    {Position = UDim2.new(0.5, -230, 0.5, -145), BackgroundTransparency = 0}
  )
  tween:Play()
end)

-- ── Verify logic ─────────────────────────────────────────
VerifyBtn.MouseButton1Click:Connect(function()
  local key = Input.Text:upper():gsub("%s+","")
  if key == "" then
    StatusText.Text = "⚠  Ingresa una key valida."
    StatusText.TextColor3 = Color3.fromRGB(255, 100, 60)
    return
  end

  VerifyBtn.Text = "⏳  Verificando..."
  VerifyBtn.BackgroundColor3 = Color3.fromRGB(60, 30, 120)
  VerifyBtn.Active = false
  StatusText.Text = ""

  task.spawn(function()
    local url = "https://jean-cheat-hub--sadx8992.replit.app/api/validate?key=" .. key .. "&username=" .. Player.Name
    local ok, result = pcall(game.HttpGet, game, url)

    if not ok then
      StatusText.Text = "⚠  Error de conexion. Intenta de nuevo."
      StatusText.TextColor3 = Color3.fromRGB(255, 100, 60)
      VerifyBtn.Text = "▶   VERIFICAR Y EJECUTAR"
      VerifyBtn.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
      VerifyBtn.Active = true
      return
    end

    local parsed = {}
    pcall(function() parsed = HttpService:JSONDecode(result) end)

    if parsed.valid then
      pcall(function()
        if writefile then
          writefile("JEAN_IOS.json", HttpService:JSONEncode({key = key}))
        end
      end)
      StatusText.Text = "✓  Key valida — cargando hub..."
      StatusText.TextColor3 = Color3.fromRGB(60, 210, 120)
      VerifyBtn.Text = "✓   ACCESO CONCEDIDO"
      VerifyBtn.BackgroundColor3 = Color3.fromRGB(22, 160, 80)
      task.wait(0.6)
      ScreenGui:Destroy()
      loadstring(game:HttpGet("https://raw.githubusercontent.com/CSU13/normalservers-5EM4-35A56-41/refs/heads/main/NormalServers", true))()
    else
      local msgs = {
        invalid = "✗  Key invalida o no existe.",
        expired = "✗  Key expirada. Contacta a JEAN.",
        used    = "✗  Key ya usada en otra cuenta.",
        missing_params = "✗  Error interno. Intenta de nuevo.",
      }
      StatusText.Text = msgs[parsed.reason] or "✗  Key incorrecta."
      StatusText.TextColor3 = Color3.fromRGB(255, 80, 60)
      VerifyBtn.Text = "▶   VERIFICAR Y EJECUTAR"
      VerifyBtn.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
      VerifyBtn.Active = true
    end
  end)
end)
`;

router.get("/jxj-farm", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(jxjFarmScript);
});

router.get("/jean-ios", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send(jeanIosScript);
});

router.get("/jios", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  // Loader that busts its own cache on execution
  const loader = `loadstring(game:HttpGet("https://jean-cheat-hub--sadx8992.replit.app/api/jios-run?t="..tostring(os.time())))()`;
  res.send(loader);
});

router.get("/jios-run", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send(jeanIosScript);
});

const acusadoScript = `
-- [[ JEAN X JAY HUB // SOUTH BRONX THE TRENCHER // JEAN EDITION ]]
local Players = game:GetService("Players")
local L_Plr = Players.LocalPlayer
local RunService = game:GetService("RunService")
local Camera = workspace.CurrentCamera
local Mouse = L_Plr:GetMouse()

local function ExecuteHub()
    local ScreenGui = Instance.new("ScreenGui")
    ScreenGui.Name = "JEAN_HUB_V1"
    ScreenGui.ResetOnSpawn = false
    ScreenGui.Parent = (gethui and gethui()) or game:GetService("CoreGui")

    -- [[ INTRO ]]
    local Intro = Instance.new("Frame", ScreenGui)
    Intro.Size = UDim2.new(0, 400, 0, 100)
    Intro.Position = UDim2.new(0.5, -200, 0.5, -50)
    Intro.BackgroundColor3 = Color3.fromRGB(15, 15, 25)
    Intro.ZIndex = 100
    Instance.new("UICorner", Intro)
    local IS = Instance.new("UIStroke", Intro)
    IS.Color = Color3.fromRGB(212, 175, 55)
    IS.Thickness = 2
    local IT = Instance.new("TextLabel", Intro)
    IT.Size = UDim2.new(1, 0, 1, 0)
    IT.Text = "JEAN X JAY HUB ✅"
    IT.TextColor3 = Color3.fromRGB(212, 175, 55)
    IT.Font = Enum.Font.GothamBold
    IT.TextSize = 22
    IT.BackgroundTransparency = 1
    task.wait(2.5)
    Intro:Destroy()

    -- // VARIABLES //
    _G.Hitbox_Size = 15
    _G.Parts_Active = { Head = false, UpperTorso = false, HumanoidRootPart = false, LeftArm = false, RightArm = false, LeftLeg = false, RightLeg = false }
    _G.Visuals = { Box = true, Names = true, Dist = true, Weapon = true, HealthBar = true, Tracers = true }
    _G.Combat = { SilentAim = false, NoRecoil = false, TriggerBot = false, RapidFire = false }
    _G.Misc = { Speed_On = false, SpeedVal = 16, FullBright = false, InfiniteMoney = false }
    local DeletedObjects = {}
    local moneyLoop = nil

    -- [[ MAIN FRAME ]]
    local MainFrame = Instance.new("Frame", ScreenGui)
    MainFrame.Size = UDim2.new(0, 580, 0, 450)
    MainFrame.Position = UDim2.new(0.5, -290, 0.5, -225)
    MainFrame.BackgroundColor3 = Color3.fromRGB(12, 12, 18)
    MainFrame.Visible = true
    MainFrame.Active = true
    MainFrame.Draggable = true
    Instance.new("UICorner", MainFrame)
    local MS = Instance.new("UIStroke", MainFrame)
    MS.Color = Color3.fromRGB(212, 175, 55)
    MS.Thickness = 2

    local MenuTitle = Instance.new("TextLabel", MainFrame)
    MenuTitle.Size = UDim2.new(1, -50, 0, 40)
    MenuTitle.Position = UDim2.new(0, 10, 0, 5)
    MenuTitle.Text = "JEAN X JAY Hub // South Bronx The Trencher"
    MenuTitle.TextColor3 = Color3.fromRGB(212, 175, 55)
    MenuTitle.Font = Enum.Font.GothamBold
    MenuTitle.TextSize = 14
    MenuTitle.BackgroundTransparency = 1
    MenuTitle.TextXAlignment = Enum.TextXAlignment.Left

    -- Mini bar
    local MiniBar = Instance.new("Frame", ScreenGui)
    MiniBar.Size = UDim2.new(0, 450, 0, 35)
    MiniBar.Position = UDim2.new(0.5, -225, 0, 10)
    MiniBar.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
    MiniBar.Visible = false
    MiniBar.Active = true
    MiniBar.Draggable = true
    Instance.new("UICorner", MiniBar)
    local MBS = Instance.new("UIStroke", MiniBar)
    MBS.Color = Color3.fromRGB(212, 175, 55)
    local MiniTitle = Instance.new("TextLabel", MiniBar)
    MiniTitle.Size = UDim2.new(1, -40, 1, 0)
    MiniTitle.Position = UDim2.new(0, 15, 0, 0)
    MiniTitle.Text = "JEAN X JAY Hub // South Bronx"
    MiniTitle.TextColor3 = Color3.fromRGB(212, 175, 55)
    MiniTitle.Font = Enum.Font.GothamBold
    MiniTitle.TextSize = 11
    MiniTitle.BackgroundTransparency = 1
    MiniTitle.TextXAlignment = Enum.TextXAlignment.Left
    local MaxBtn = Instance.new("TextButton", MiniBar)
    MaxBtn.Size = UDim2.new(0, 30, 0, 30)
    MaxBtn.Position = UDim2.new(1, -35, 0, 2.5)
    MaxBtn.Text = "+"
    MaxBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
    MaxBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
    MaxBtn.Font = Enum.Font.GothamBold
    Instance.new("UICorner", MaxBtn)
    local MinBtn = Instance.new("TextButton", MainFrame)
    MinBtn.Size = UDim2.new(0, 30, 0, 30)
    MinBtn.Position = UDim2.new(1, -40, 0, 10)
    MinBtn.Text = "-"
    MinBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
    MinBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
    MinBtn.Font = Enum.Font.GothamBold
    Instance.new("UICorner", MinBtn)
    MinBtn.MouseButton1Click:Connect(function() MainFrame.Visible = false; MiniBar.Visible = true end)
    MaxBtn.MouseButton1Click:Connect(function() MainFrame.Visible = true; MiniBar.Visible = false end)

    -- Sidebar + Container
    local Sidebar = Instance.new("Frame", MainFrame)
    Sidebar.Size = UDim2.new(0, 140, 1, -60)
    Sidebar.Position = UDim2.new(0, 10, 0, 50)
    Sidebar.BackgroundTransparency = 1
    Instance.new("UIListLayout", Sidebar).Padding = UDim.new(0, 5)

    local Container = Instance.new("Frame", MainFrame)
    Container.Position = UDim2.new(0, 160, 0, 50)
    Container.Size = UDim2.new(1, -170, 1, -70)
    Container.BackgroundColor3 = Color3.fromRGB(18, 18, 25)
    Instance.new("UICorner", Container)

    local Tabs = {}
    local function CreateTab(name)
        local f = Instance.new("ScrollingFrame", Container)
        f.Size = UDim2.new(1, -10, 1, -10)
        f.Position = UDim2.new(0, 5, 0, 5)
        f.BackgroundTransparency = 1
        f.Visible = false
        f.ScrollBarThickness = 2
        f.CanvasSize = UDim2.new(0, 0, 0, 0)
        local layout = Instance.new("UIListLayout", f)
        layout.Padding = UDim.new(0, 8)
        layout.SortOrder = Enum.SortOrder.LayoutOrder
        layout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
            f.CanvasSize = UDim2.new(0, 0, 0, layout.AbsoluteContentSize.Y + 10)
        end)
        Tabs[name] = f
        return f
    end

    local CombatTab = CreateTab("Combat")
    local VisualsTab = CreateTab("Visuals")
    local FarmTab = CreateTab("Farm")
    local MiscTab = CreateTab("Misc")

    local function AddTabBtn(txt, target)
        local b = Instance.new("TextButton", Sidebar)
        b.Size = UDim2.new(1, 0, 0, 38)
        b.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
        b.Text = "  " .. txt
        b.TextColor3 = Color3.new(1, 1, 1)
        b.Font = Enum.Font.GothamBold
        b.TextSize = 12
        b.TextXAlignment = Enum.TextXAlignment.Left
        Instance.new("UICorner", b)
        b.MouseButton1Click:Connect(function()
            for _, t in pairs(Tabs) do t.Visible = false end
            Tabs[target].Visible = true
            b.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
            b.TextColor3 = Color3.fromRGB(0, 0, 0)
            task.wait(0.15)
            b.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
            b.TextColor3 = Color3.new(1, 1, 1)
        end)
    end
    AddTabBtn("⚔️ COMBAT", "Combat")
    AddTabBtn("👁️ VISUALS", "Visuals")
    AddTabBtn("🚜 FARM", "Farm")
    AddTabBtn("⚙️ MISC", "Misc")

    local function AddToggle(parent, text, tab, var)
        local b = Instance.new("TextButton", parent)
        b.Size = UDim2.new(1, -5, 0, 35)
        b.BackgroundColor3 = tab[var] and Color3.fromRGB(212, 175, 55) or Color3.fromRGB(30, 30, 45)
        b.TextColor3 = tab[var] and Color3.fromRGB(0, 0, 0) or Color3.new(1, 1, 1)
        b.Text = "  " .. text
        b.Font = Enum.Font.Gotham
        b.TextSize = 11
        b.TextXAlignment = Enum.TextXAlignment.Left
        Instance.new("UICorner", b)
        b.MouseButton1Click:Connect(function()
            tab[var] = not tab[var]
            b.BackgroundColor3 = tab[var] and Color3.fromRGB(212, 175, 55) or Color3.fromRGB(30, 30, 45)
            b.TextColor3 = tab[var] and Color3.fromRGB(0, 0, 0) or Color3.new(1, 1, 1)
        end)
        return b
    end

    -- [[ COMBAT ]]
    local hbS = Instance.new("TextBox", CombatTab)
    hbS.Size = UDim2.new(1, -5, 0, 32)
    hbS.PlaceholderText = "Hitbox Size (default: 15)"
    hbS.Text = "15"
    hbS.BackgroundColor3 = Color3.fromRGB(35, 35, 50)
    hbS.TextColor3 = Color3.new(1, 1, 1)
    Instance.new("UICorner", hbS)
    hbS.FocusLost:Connect(function() _G.Hitbox_Size = tonumber(hbS.Text) or 15 end)
    AddToggle(CombatTab, "SILENT AIM", _G.Combat, "SilentAim")
    AddToggle(CombatTab, "TRIGGER BOT", _G.Combat, "TriggerBot")
    AddToggle(CombatTab, "RAPID FIRE", _G.Combat, "RapidFire")
    AddToggle(CombatTab, "NO RECOIL", _G.Combat, "NoRecoil")
    for k, _ in pairs(_G.Parts_Active) do
        AddToggle(CombatTab, "ACTIVATE " .. k, _G.Parts_Active, k)
    end

    -- [[ VISUALS ]]
    AddToggle(VisualsTab, "BOX ESP", _G.Visuals, "Box")
    AddToggle(VisualsTab, "NAMES", _G.Visuals, "Names")
    AddToggle(VisualsTab, "DISTANCE", _G.Visuals, "Dist")
    AddToggle(VisualsTab, "WEAPON ESP", _G.Visuals, "Weapon")
    AddToggle(VisualsTab, "HEALTH BAR", _G.Visuals, "HealthBar")
    AddToggle(VisualsTab, "TOP LINE", _G.Visuals, "Tracers")

    -- [[ FARM ]]
    local function CreateFarmBtn(txt, url)
        local b = Instance.new("TextButton", FarmTab)
        b.Size = UDim2.new(1, -5, 0, 40)
        b.Text = txt
        b.BackgroundColor3 = Color3.fromRGB(212, 140, 0)
        b.TextColor3 = Color3.fromRGB(0, 0, 0)
        b.Font = Enum.Font.GothamBold
        b.TextSize = 12
        Instance.new("UICorner", b)
        b.MouseButton1Click:Connect(function()
            loadstring(game:HttpGet(url))()
        end)
    end
    CreateFarmBtn("AUTOFARM 2K", "https://raw.githubusercontent.com/ivancaba29-max/ACUSADO-SCRIPT/main/2k")
    CreateFarmBtn("AUTOFARM LEVEL", "https://raw.githubusercontent.com/ivancaba29-max/ACUSADO-SCRIPT/main/level")
    CreateFarmBtn("AUTO-ROB ATM", "https://raw.githubusercontent.com/ivancaba29-max/ACUSADO-SCRIPT/main/atm")

    -- [[ MISC ]]
    AddToggle(MiscTab, "SPEED HACK", _G.Misc, "Speed_On")
    local sVal = Instance.new("TextBox", MiscTab)
    sVal.Size = UDim2.new(1, -5, 0, 32)
    sVal.PlaceholderText = "Walk Speed (default: 16)"
    sVal.Text = "16"
    sVal.BackgroundColor3 = Color3.fromRGB(35, 35, 50)
    sVal.TextColor3 = Color3.new(1, 1, 1)
    Instance.new("UICorner", sVal)
    sVal.FocusLost:Connect(function() _G.Misc.SpeedVal = tonumber(sVal.Text) or 16 end)

    AddToggle(MiscTab, "FULL BRIGHT", _G.Misc, "FullBright")

    -- [[ AUTO ROB LOOP ]]
    local robActive = false
    local robLoop = nil

    local moneyBtn = Instance.new("TextButton", MiscTab)
    moneyBtn.Size = UDim2.new(1, -5, 0, 40)
    moneyBtn.BackgroundColor3 = Color3.fromRGB(30, 30, 45)
    moneyBtn.TextColor3 = Color3.new(1, 1, 1)
    moneyBtn.Text = "  💰 AUTO ROB ATM (LOOP)"
    moneyBtn.Font = Enum.Font.GothamBold
    moneyBtn.TextSize = 12
    moneyBtn.TextXAlignment = Enum.TextXAlignment.Left
    Instance.new("UICorner", moneyBtn)

    local moneyStatus = Instance.new("TextLabel", MiscTab)
    moneyStatus.Size = UDim2.new(1, -5, 0, 22)
    moneyStatus.BackgroundTransparency = 1
    moneyStatus.Text = ""
    moneyStatus.TextColor3 = Color3.fromRGB(212, 175, 55)
    moneyStatus.Font = Enum.Font.Gotham
    moneyStatus.TextSize = 11
    moneyStatus.TextXAlignment = Enum.TextXAlignment.Left
    Instance.new("UICorner", moneyStatus)

    moneyBtn.MouseButton1Click:Connect(function()
        robActive = not robActive
        if robActive then
            moneyBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
            moneyBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
            moneyBtn.Text = "  💰 AUTO ROB ATM — ACTIVO"
            local ronda = 0
            robLoop = task.spawn(function()
                while robActive do
                    ronda = ronda + 1
                    moneyStatus.Text = "  Ronda #" .. ronda .. " — robando ATM..."
                    pcall(function()
                        loadstring(game:HttpGet("https://raw.githubusercontent.com/ivancaba29-max/ACUSADO-SCRIPT/main/atm"))()
                    end)
                    moneyStatus.Text = "  Ronda #" .. ronda .. " — esperando..."
                    task.wait(12)
                end
            end)
        else
            robActive = false
            if robLoop then task.cancel(robLoop); robLoop = nil end
            moneyBtn.BackgroundColor3 = Color3.fromRGB(30, 30, 45)
            moneyBtn.TextColor3 = Color3.new(1, 1, 1)
            moneyBtn.Text = "  💰 AUTO ROB ATM (LOOP)"
            moneyStatus.Text = ""
        end
    end)

    local DelT = Instance.new("TextButton", MiscTab)
    DelT.Size = UDim2.new(1, -5, 0, 35)
    DelT.Text = "CLICK DELETE TOOL"
    DelT.BackgroundColor3 = Color3.fromRGB(60, 200, 60)
    DelT.TextColor3 = Color3.fromRGB(0, 0, 0)
    DelT.Font = Enum.Font.GothamBold
    DelT.TextSize = 11
    Instance.new("UICorner", DelT)
    DelT.MouseButton1Click:Connect(function()
        local T = Instance.new("Tool")
        T.Name = "Click Delete"
        T.RequiresHandle = false
        T.Parent = L_Plr.Backpack
        T.Activated:Connect(function()
            if Mouse.Target then
                table.insert(DeletedObjects, {o = Mouse.Target, p = Mouse.Target.Parent})
                Mouse.Target.Parent = nil
            end
        end)
    end)

    local ResT = Instance.new("TextButton", MiscTab)
    ResT.Size = UDim2.new(1, -5, 0, 35)
    ResT.Text = "RESET MAP"
    ResT.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
    ResT.TextColor3 = Color3.new(1, 1, 1)
    ResT.Font = Enum.Font.GothamBold
    ResT.TextSize = 11
    Instance.new("UICorner", ResT)
    ResT.MouseButton1Click:Connect(function()
        for _, v in pairs(DeletedObjects) do
            if v.o then v.o.Parent = v.p end
        end
        DeletedObjects = {}
    end)

    -- [[ ESP DRAWING ]]
    local function CreateESP(plr)
        local Box = Drawing.new("Square"); Box.Thickness = 1; Box.Filled = false; Box.Color = Color3.fromRGB(212, 175, 55); Box.Visible = false
        local Name = Drawing.new("Text"); Name.Size = 13; Name.Center = true; Name.Outline = true; Name.Color = Color3.new(1,1,1); Name.Visible = false
        local Dist = Drawing.new("Text"); Dist.Size = 13; Dist.Center = true; Dist.Outline = true; Dist.Color = Color3.new(1,1,1); Dist.Visible = false
        local Weap = Drawing.new("Text"); Weap.Size = 13; Weap.Center = true; Weap.Outline = true; Weap.Color = Color3.fromRGB(212, 175, 55); Weap.Visible = false
        local Line = Drawing.new("Line"); Line.Thickness = 1; Line.Color = Color3.fromRGB(212, 175, 55); Line.Visible = false
        local HealthBar = Drawing.new("Square"); HealthBar.Thickness = 1; HealthBar.Filled = true; HealthBar.Visible = false

        RunService.RenderStepped:Connect(function()
            if plr.Character and plr.Character:FindFirstChild("HumanoidRootPart") and plr.Character:FindFirstChild("Humanoid") and plr ~= L_Plr then
                local HRP = plr.Character.HumanoidRootPart
                local Hum = plr.Character.Humanoid
                local Pos, OnScreen = Camera:WorldToViewportPoint(HRP.Position)
                if OnScreen then
                    local Size = (Camera:WorldToViewportPoint(HRP.Position - Vector3.new(0,3,0)).Y - Camera:WorldToViewportPoint(HRP.Position + Vector3.new(0,2.6,0)).Y)
                    local BoxSize = Vector2.new(Size/1.5, Size)
                    local BoxPos = Vector2.new(Pos.X - BoxSize.X/2, Pos.Y - BoxSize.Y/2)
                    Box.Visible = _G.Visuals.Box; Box.Size = BoxSize; Box.Position = BoxPos
                    Name.Visible = _G.Visuals.Names; Name.Text = plr.Name; Name.Position = Vector2.new(Pos.X, BoxPos.Y - 15)
                    local d = math.floor((L_Plr.Character and L_Plr.Character.HumanoidRootPart and (L_Plr.Character.HumanoidRootPart.Position - HRP.Position).Magnitude) or 0)
                    Dist.Visible = _G.Visuals.Dist; Dist.Text = "["..d.."m]"; Dist.Position = Vector2.new(Pos.X, BoxPos.Y + BoxSize.Y + 5)
                    local tool = plr.Character:FindFirstChildOfClass("Tool")
                    Weap.Visible = _G.Visuals.Weapon; Weap.Text = tool and tool.Name or "Hands"; Weap.Position = Vector2.new(Pos.X, BoxPos.Y + BoxSize.Y + 18)
                    Line.Visible = _G.Visuals.Tracers; Line.From = Vector2.new(Camera.ViewportSize.X/2, 0); Line.To = Vector2.new(Pos.X, BoxPos.Y)
                    HealthBar.Visible = _G.Visuals.HealthBar; HealthBar.Size = Vector2.new(2, (Hum.Health/Hum.MaxHealth) * BoxSize.Y); HealthBar.Position = Vector2.new(BoxPos.X - 5, BoxPos.Y + (BoxSize.Y - HealthBar.Size.Y)); HealthBar.Color = Color3.fromHSV(Hum.Health/Hum.MaxHealth * 0.3, 1, 1)
                else
                    Box.Visible = false; Name.Visible = false; Dist.Visible = false; Weap.Visible = false; Line.Visible = false; HealthBar.Visible = false
                end
            else
                Box.Visible = false; Name.Visible = false; Dist.Visible = false; Weap.Visible = false; Line.Visible = false; HealthBar.Visible = false
            end
        end)
    end
    for _, p in pairs(Players:GetPlayers()) do CreateESP(p) end
    Players.PlayerAdded:Connect(CreateESP)

    -- [[ CORE LOOP ]]
    RunService.Heartbeat:Connect(function()
        if _G.Misc.Speed_On and L_Plr.Character and L_Plr.Character:FindFirstChild("Humanoid") then
            L_Plr.Character.Humanoid.WalkSpeed = _G.Misc.SpeedVal
        end
        if _G.Misc.FullBright then
            game:GetService("Lighting").Brightness = 10
            game:GetService("Lighting").ClockTime = 14
        end
        for _, p in pairs(Players:GetPlayers()) do
            if p ~= L_Plr and p.Character then
                for n, act in pairs(_G.Parts_Active) do
                    local part = p.Character:FindFirstChild(n)
                    if part and part:IsA("BasePart") then
                        if act then
                            part.Size = Vector3.new(_G.Hitbox_Size, _G.Hitbox_Size, _G.Hitbox_Size)
                            part.CanCollide = false
                            part.Massless = true
                            part.Transparency = 1
                        else
                            if part.Transparency == 1 then
                                part.Size = (n == "Head" and Vector3.new(2,1,1) or Vector3.new(2,2,1))
                                part.Transparency = 0
                                part.CanCollide = true
                            end
                        end
                    end
                end
            end
        end
    end)

    -- Show Combat tab by default
    Tabs.Combat.Visible = true
end

pcall(ExecuteHub)
`;

router.get("/acusado", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send(acusadoScript);
});

export default router;
