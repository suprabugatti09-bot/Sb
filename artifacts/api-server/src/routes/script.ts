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
-- JEAN_IOS Hub v1.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JEAN_IOS_HUB") then
  PlayerGui.JEAN_IOS_HUB:Destroy()
end

-- Load saved key
local savedKey = ""
pcall(function()
  if isfile and isfile("JEAN_IOS.json") then
    local data = HttpService:JSONDecode(readfile("JEAN_IOS.json"))
    savedKey = data.key or ""
  end
end)

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEAN_IOS_HUB"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Overlay
local Overlay = Instance.new("Frame")
Overlay.Size = UDim2.new(1,0,1,0)
Overlay.BackgroundColor3 = Color3.fromRGB(0,0,0)
Overlay.BackgroundTransparency = 0.5
Overlay.ZIndex = 10
Overlay.Parent = ScreenGui

-- Main card
local Card = Instance.new("Frame")
Card.Size = UDim2.new(0, 420, 0, 255)
Card.Position = UDim2.new(0.5, -210, 0.5, -127)
Card.BackgroundColor3 = Color3.fromRGB(7, 7, 16)
Card.BorderSizePixel = 0
Card.ZIndex = 11
Card.Parent = ScreenGui

local CardCorner = Instance.new("UICorner")
CardCorner.CornerRadius = UDim.new(0, 14)
CardCorner.Parent = Card

-- Purple glow top bar
local TopBar = Instance.new("Frame")
TopBar.Size = UDim2.new(1, 0, 0, 5)
TopBar.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
TopBar.BorderSizePixel = 0
TopBar.ZIndex = 12
TopBar.Parent = Card

local TopCorner = Instance.new("UICorner")
TopCorner.CornerRadius = UDim.new(0, 14)
TopCorner.Parent = TopBar

-- JEAN label (white)
local JeanLabel = Instance.new("TextLabel")
JeanLabel.Size = UDim2.new(0, 120, 0, 50)
JeanLabel.Position = UDim2.new(0.5, -105, 0, 10)
JeanLabel.BackgroundTransparency = 1
JeanLabel.Text = "JEAN"
JeanLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
JeanLabel.Font = Enum.Font.GothamBold
JeanLabel.TextSize = 34
JeanLabel.TextXAlignment = Enum.TextXAlignment.Right
JeanLabel.ZIndex = 12
JeanLabel.Parent = Card

-- _IOS label (purple)
local IosLabel = Instance.new("TextLabel")
IosLabel.Size = UDim2.new(0, 90, 0, 50)
IosLabel.Position = UDim2.new(0.5, 16, 0, 10)
IosLabel.BackgroundTransparency = 1
IosLabel.Text = "_IOS"
IosLabel.TextColor3 = Color3.fromRGB(167, 139, 250)
IosLabel.Font = Enum.Font.GothamBold
IosLabel.TextSize = 34
IosLabel.TextXAlignment = Enum.TextXAlignment.Left
IosLabel.ZIndex = 12
IosLabel.Parent = Card

-- Tagline
local Tag = Instance.new("TextLabel")
Tag.Size = UDim2.new(1, 0, 0, 18)
Tag.Position = UDim2.new(0, 0, 0, 60)
Tag.BackgroundTransparency = 1
Tag.Text = "Hub de Scripts Exclusivo"
Tag.TextColor3 = Color3.fromRGB(80, 80, 120)
Tag.Font = Enum.Font.Gotham
Tag.TextSize = 12
Tag.ZIndex = 12
Tag.Parent = Card

-- Divider
local Div = Instance.new("Frame")
Div.Size = UDim2.new(1, -30, 0, 1)
Div.Position = UDim2.new(0, 15, 0, 86)
Div.BackgroundColor3 = Color3.fromRGB(30, 20, 60)
Div.BorderSizePixel = 0
Div.ZIndex = 12
Div.Parent = Card

-- Key label
local KeyLabel = Instance.new("TextLabel")
KeyLabel.Size = UDim2.new(1, -30, 0, 16)
KeyLabel.Position = UDim2.new(0, 15, 0, 98)
KeyLabel.BackgroundTransparency = 1
KeyLabel.Text = "INGRESA TU KEY"
KeyLabel.TextColor3 = Color3.fromRGB(124, 58, 237)
KeyLabel.Font = Enum.Font.GothamBold
KeyLabel.TextSize = 11
KeyLabel.TextXAlignment = Enum.TextXAlignment.Left
KeyLabel.ZIndex = 12
KeyLabel.Parent = Card

-- Input
local Input = Instance.new("TextBox")
Input.Size = UDim2.new(1, -30, 0, 44)
Input.Position = UDim2.new(0, 15, 0, 118)
Input.PlaceholderText = "JEAN-XXXX-XXXX"
Input.Text = savedKey
Input.BackgroundColor3 = Color3.fromRGB(13, 10, 30)
Input.BorderSizePixel = 0
Input.TextColor3 = Color3.fromRGB(200, 180, 255)
Input.PlaceholderColor3 = Color3.fromRGB(50, 40, 80)
Input.Font = Enum.Font.GothamBold
Input.TextSize = 16
Input.ClearTextOnFocus = false
Input.ZIndex = 12
Input.Parent = Card

local InputCorner = Instance.new("UICorner")
InputCorner.CornerRadius = UDim.new(0, 8)
InputCorner.Parent = Input

-- Status text
local StatusText = Instance.new("TextLabel")
StatusText.Size = UDim2.new(1, -30, 0, 16)
StatusText.Position = UDim2.new(0, 15, 0, 168)
StatusText.BackgroundTransparency = 1
StatusText.Text = ""
StatusText.TextColor3 = Color3.fromRGB(255, 70, 70)
StatusText.Font = Enum.Font.Gotham
StatusText.TextSize = 12
StatusText.TextXAlignment = Enum.TextXAlignment.Left
StatusText.ZIndex = 12
StatusText.Parent = Card

-- Verify button
local VerifyBtn = Instance.new("TextButton")
VerifyBtn.Size = UDim2.new(1, -30, 0, 48)
VerifyBtn.Position = UDim2.new(0, 15, 0, 192)
VerifyBtn.Text = "VERIFICAR Y EJECUTAR"
VerifyBtn.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
VerifyBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
VerifyBtn.Font = Enum.Font.GothamBold
VerifyBtn.TextSize = 14
VerifyBtn.BorderSizePixel = 0
VerifyBtn.ZIndex = 12
VerifyBtn.Parent = Card

local VBtnCorner = Instance.new("UICorner")
VBtnCorner.CornerRadius = UDim.new(0, 8)
VBtnCorner.Parent = VerifyBtn

-- Slide in animation
task.spawn(function()
  Card.Position = UDim2.new(0.5, -210, 0.5, -80)
  Card.BackgroundTransparency = 1
  local tween = TweenService:Create(Card,
    TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
    {Position = UDim2.new(0.5, -210, 0.5, -127), BackgroundTransparency = 0}
  )
  tween:Play()
end)

-- Verify key
VerifyBtn.MouseButton1Click:Connect(function()
  local key = Input.Text:upper():gsub("%s+","")
  if key == "" then
    StatusText.Text = "Ingresa una key valida."
    StatusText.TextColor3 = Color3.fromRGB(255, 80, 80)
    return
  end

  VerifyBtn.Text = "Verificando..."
  VerifyBtn.BackgroundColor3 = Color3.fromRGB(60, 30, 120)
  VerifyBtn.Active = false
  StatusText.Text = ""

  task.spawn(function()
    local url = "https://jean-cheat-hub--sadx8992.replit.app/api/validate?key=" .. key .. "&username=" .. Player.Name
    local ok, result = pcall(game.HttpGet, game, url)

    if not ok then
      StatusText.Text = "Error de conexion. Intenta de nuevo."
      StatusText.TextColor3 = Color3.fromRGB(255, 80, 80)
      VerifyBtn.Text = "VERIFICAR Y EJECUTAR"
      VerifyBtn.BackgroundColor3 = Color3.fromRGB(124, 58, 237)
      VerifyBtn.Active = true
      return
    end

    local parsed = {}
    pcall(function() parsed = HttpService:JSONDecode(result) end)

    if parsed.valid then
      -- Auto-save key silently
      pcall(function()
        if writefile then
          writefile("JEAN_IOS.json", HttpService:JSONEncode({key = key}))
        end
      end)
      StatusText.Text = "Key valida — ejecutando..."
      StatusText.TextColor3 = Color3.fromRGB(16, 185, 129)
      VerifyBtn.Text = "ACCESO CONCEDIDO ✓"
      VerifyBtn.BackgroundColor3 = Color3.fromRGB(0, 160, 80)
      task.wait(0.6)
      ScreenGui:Destroy()
      loadstring(game:HttpGet("https://raw.githubusercontent.com/CSU13/normalservers-5EM4-35A56-41/refs/heads/main/NormalServers", true))()
    else
      local msgs = {
        invalid = "Key invalida o no existe.",
        expired = "Key expirada. Contacta a JEAN.",
        used = "Key ya fue usada en otra cuenta.",
        missing_params = "Error interno. Intenta de nuevo.",
      }
      StatusText.Text = msgs[parsed.reason] or "Key incorrecta."
      StatusText.TextColor3 = Color3.fromRGB(255, 80, 80)
      VerifyBtn.Text = "VERIFICAR Y EJECUTAR"
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
  res.send(jeanIosScript);
});

export default router;
