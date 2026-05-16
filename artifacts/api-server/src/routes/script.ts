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

router.get("/script", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(luaScript);
});

export default router;
