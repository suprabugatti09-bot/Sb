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
-- JEAN X JAY
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")

if PlayerGui:FindFirstChild("JXJTag") then
  PlayerGui.JXJTag:Destroy()
end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JXJTag"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = PlayerGui

-- Top banner
local Banner = Instance.new("Frame")
Banner.Size = UDim2.new(0, 260, 0, 44)
Banner.Position = UDim2.new(0.5, -130, 0, -50)
Banner.BackgroundColor3 = Color3.fromRGB(8, 8, 8)
Banner.BorderSizePixel = 0
Banner.ZIndex = 10
Banner.Parent = ScreenGui

local BannerCorner = Instance.new("UICorner")
BannerCorner.CornerRadius = UDim.new(0, 6)
BannerCorner.Parent = Banner

-- Gold bottom line
local GoldLine = Instance.new("Frame")
GoldLine.Size = UDim2.new(1, 0, 0, 3)
GoldLine.Position = UDim2.new(0, 0, 1, -3)
GoldLine.BackgroundColor3 = Color3.fromRGB(245, 197, 24)
GoldLine.BorderSizePixel = 0
GoldLine.ZIndex = 11
GoldLine.Parent = Banner

local GoldCorner = Instance.new("UICorner")
GoldCorner.CornerRadius = UDim.new(0, 6)
GoldCorner.Parent = GoldLine

-- Label
local Label = Instance.new("TextLabel")
Label.Size = UDim2.new(1, 0, 1, 0)
Label.BackgroundTransparency = 1
Label.Text = "JEAN  ✦  X  ✦  JAY"
Label.TextColor3 = Color3.fromRGB(245, 197, 24)
Label.Font = Enum.Font.GothamBold
Label.TextSize = 17
Label.ZIndex = 11
Label.Parent = Banner

-- Animation runs in background so it does NOT block script execution
task.spawn(function()
  -- Slide in
  local tweenIn = TweenService:Create(
    Banner,
    TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
    {Position = UDim2.new(0.5, -130, 0, 10)}
  )
  tweenIn:Play()
  tweenIn.Completed:Wait()

  task.wait(2.5)

  -- Slide out
  local tweenOut = TweenService:Create(
    Banner,
    TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In),
    {Position = UDim2.new(0.5, -130, 0, -60)}
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

export default router;
