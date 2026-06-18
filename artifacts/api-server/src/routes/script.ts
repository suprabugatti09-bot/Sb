import { Router } from "express";

const router = Router();

// ── /api/acusado ── JEAN X JAY | Solo Loot + Teleport + Key System
const acusadoScript = (host: string) => `
-- JEAN X JAY | South Bronx
-- discord: jean14_17

local Players       = game:GetService("Players")
local HttpService   = game:GetService("HttpService")
local RunService    = game:GetService("RunService")
local TweenService  = game:GetService("TweenService")

local L_Plr   = Players.LocalPlayer
local L_PGui  = L_Plr:WaitForChild("PlayerGui")
local Camera  = workspace.CurrentCamera

-- Limpiar GUI anterior
if L_PGui:FindFirstChild("JXJMain") then L_PGui.JXJMain:Destroy() end

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JXJMain"
ScreenGui.ResetOnSpawn = false
ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
ScreenGui.Parent = L_PGui

-- ════════════════════════════════════════
--  KEY SCREEN
-- ════════════════════════════════════════
local KeyFrame = Instance.new("Frame", ScreenGui)
KeyFrame.Size = UDim2.new(0, 360, 0, 210)
KeyFrame.Position = UDim2.new(0.5, -180, 0.5, -105)
KeyFrame.BackgroundColor3 = Color3.fromRGB(10, 10, 10)
KeyFrame.BorderSizePixel = 0
Instance.new("UICorner", KeyFrame).CornerRadius = UDim.new(0, 10)

local TopBar = Instance.new("Frame", KeyFrame)
TopBar.Size = UDim2.new(1, 0, 0, 5)
TopBar.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
TopBar.BorderSizePixel = 0
Instance.new("UICorner", TopBar).CornerRadius = UDim.new(0, 10)

local KTitle = Instance.new("TextLabel", KeyFrame)
KTitle.Size = UDim2.new(1, 0, 0, 50)
KTitle.Position = UDim2.new(0, 0, 0, 8)
KTitle.BackgroundTransparency = 1
KTitle.Text = "JEAN X JAY"
KTitle.TextColor3 = Color3.fromRGB(212, 175, 55)
KTitle.Font = Enum.Font.GothamBold
KTitle.TextSize = 26

local KSub = Instance.new("TextLabel", KeyFrame)
KSub.Size = UDim2.new(1, 0, 0, 18)
KSub.Position = UDim2.new(0, 0, 0, 55)
KSub.BackgroundTransparency = 1
KSub.Text = "Ingresa tu key"
KSub.TextColor3 = Color3.fromRGB(90, 90, 90)
KSub.Font = Enum.Font.Gotham
KSub.TextSize = 12

local InputBox = Instance.new("TextBox", KeyFrame)
InputBox.Size = UDim2.new(1, -30, 0, 42)
InputBox.Position = UDim2.new(0, 15, 0, 82)
InputBox.PlaceholderText = "JEAN-XXXX-XXXX"
InputBox.Text = ""
InputBox.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
InputBox.BorderSizePixel = 0
InputBox.TextColor3 = Color3.fromRGB(212, 175, 55)
InputBox.PlaceholderColor3 = Color3.fromRGB(55, 55, 55)
InputBox.Font = Enum.Font.Code
InputBox.TextSize = 15
InputBox.ClearTextOnFocus = false
Instance.new("UICorner", InputBox).CornerRadius = UDim.new(0, 6)

local VerBtn = Instance.new("TextButton", KeyFrame)
VerBtn.Size = UDim2.new(1, -30, 0, 40)
VerBtn.Position = UDim2.new(0, 15, 0, 134)
VerBtn.Text = "VERIFICAR KEY"
VerBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
VerBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
VerBtn.Font = Enum.Font.GothamBold
VerBtn.TextSize = 14
VerBtn.BorderSizePixel = 0
Instance.new("UICorner", VerBtn).CornerRadius = UDim.new(0, 6)

local KStatus = Instance.new("TextLabel", KeyFrame)
KStatus.Size = UDim2.new(1, 0, 0, 22)
KStatus.Position = UDim2.new(0, 0, 0, 182)
KStatus.BackgroundTransparency = 1
KStatus.Text = ""
KStatus.TextColor3 = Color3.fromRGB(220, 60, 60)
KStatus.Font = Enum.Font.GothamBold
KStatus.TextSize = 12

-- ════════════════════════════════════════
--  MAIN PANEL (oculto hasta key válida)
-- ════════════════════════════════════════
local MainFrame = Instance.new("Frame", ScreenGui)
MainFrame.Size = UDim2.new(0, 290, 0, 380)
MainFrame.Position = UDim2.new(0, 12, 0.5, -190)
MainFrame.BackgroundColor3 = Color3.fromRGB(10, 10, 14)
MainFrame.BorderSizePixel = 0
MainFrame.Visible = false
Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 10)

-- Barra dorada top
local MBar = Instance.new("Frame", MainFrame)
MBar.Size = UDim2.new(1, 0, 0, 5)
MBar.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
MBar.BorderSizePixel = 0
Instance.new("UICorner", MBar).CornerRadius = UDim.new(0, 10)

-- Titulo
local MTitle = Instance.new("TextLabel", MainFrame)
MTitle.Size = UDim2.new(1, -10, 0, 38)
MTitle.Position = UDim2.new(0, 10, 0, 7)
MTitle.BackgroundTransparency = 1
MTitle.Text = "JEAN X JAY"
MTitle.TextColor3 = Color3.fromRGB(212, 175, 55)
MTitle.Font = Enum.Font.GothamBold
MTitle.TextSize = 20
MTitle.TextXAlignment = Enum.TextXAlignment.Left

local MUser = Instance.new("TextLabel", MainFrame)
MUser.Size = UDim2.new(1, -10, 0, 16)
MUser.Position = UDim2.new(0, 10, 0, 42)
MUser.BackgroundTransparency = 1
MUser.Text = ""
MUser.TextColor3 = Color3.fromRGB(70, 70, 70)
MUser.Font = Enum.Font.Gotham
MUser.TextSize = 11
MUser.TextXAlignment = Enum.TextXAlignment.Left

-- Divisor
local Div = Instance.new("Frame", MainFrame)
Div.Size = UDim2.new(1, -16, 0, 1)
Div.Position = UDim2.new(0, 8, 0, 62)
Div.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
Div.BorderSizePixel = 0

-- Scroll content
local Content = Instance.new("ScrollingFrame", MainFrame)
Content.Size = UDim2.new(1, 0, 1, -68)
Content.Position = UDim2.new(0, 0, 0, 68)
Content.BackgroundTransparency = 1
Content.BorderSizePixel = 0
Content.ScrollBarThickness = 3
Content.AutomaticCanvasSize = Enum.AutomaticSize.Y
Content.CanvasSize = UDim2.new(0,0,0,0)
local CLayout = Instance.new("UIListLayout", Content)
CLayout.Padding = UDim.new(0, 6)
local CPad = Instance.new("UIPadding", Content)
CPad.PaddingLeft = UDim.new(0, 8)
CPad.PaddingRight = UDim.new(0, 8)
CPad.PaddingTop = UDim.new(0, 8)

-- ── Drag MainFrame ──
local dragging, dragStart, startPos
MainFrame.InputBegan:Connect(function(inp)
    if inp.UserInputType == Enum.UserInputType.MouseButton1 or inp.UserInputType == Enum.UserInputType.Touch then
        dragging = true; dragStart = inp.Position; startPos = MainFrame.Position
    end
end)
MainFrame.InputChanged:Connect(function(inp)
    if dragging and (inp.UserInputType == Enum.UserInputType.MouseMovement or inp.UserInputType == Enum.UserInputType.Touch) then
        local d = inp.Position - dragStart
        MainFrame.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + d.X, startPos.Y.Scale, startPos.Y.Offset + d.Y)
    end
end)
MainFrame.InputEnded:Connect(function(inp)
    if inp.UserInputType == Enum.UserInputType.MouseButton1 or inp.UserInputType == Enum.UserInputType.Touch then
        dragging = false
    end
end)

-- ── Helper: crear botón dorado ──
local function MakeBtn(parent, text, h)
    local b = Instance.new("TextButton", parent)
    b.Size = UDim2.new(1, 0, 0, h or 42)
    b.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
    b.TextColor3 = Color3.fromRGB(0, 0, 0)
    b.Text = text
    b.Font = Enum.Font.GothamBold
    b.TextSize = 13
    b.BorderSizePixel = 0
    Instance.new("UICorner", b).CornerRadius = UDim.new(0, 7)
    return b
end

local function MakeLabel(parent, text, color, size)
    local l = Instance.new("TextLabel", parent)
    l.Size = UDim2.new(1, 0, 0, 18)
    l.BackgroundTransparency = 1
    l.Text = text
    l.TextColor3 = color or Color3.fromRGB(212, 175, 55)
    l.Font = Enum.Font.Gotham
    l.TextSize = size or 11
    l.TextXAlignment = Enum.TextXAlignment.Left
    return l
end

-- ════════════════════════════════════════
--  🎒 LOOTEAR AHORA
-- ════════════════════════════════════════
local LootBtn = MakeBtn(Content, "  🎒  LOOTEAR AHORA", 44)
LootBtn.TextXAlignment = Enum.TextXAlignment.Left

local LootStatus = MakeLabel(Content, "", Color3.fromRGB(212, 175, 55), 11)

LootBtn.MouseButton1Click:Connect(function()
    task.spawn(function()
        pcall(function()
            local myChar = L_Plr.Character
            if not myChar then return end
            local myHRP = myChar:FindFirstChild("HumanoidRootPart")
            if not myHRP then return end
            local myPos = myHRP.Position
            local radius = 30
            local count = 0
            for _, obj in pairs(workspace:GetDescendants()) do
                if obj:IsA("ProximityPrompt") then
                    local part = obj.Parent
                    local p = part and (part:IsA("BasePart") and part.Position
                        or (part:FindFirstChildOfClass("BasePart") and part:FindFirstChildOfClass("BasePart").Position))
                    if p and (p - myPos).Magnitude < radius then
                        pcall(function() fireproximityprompt(obj) end)
                        count += 1
                    end
                end
                if obj:IsA("ClickDetector") then
                    local part = obj.Parent
                    local p = part and part:IsA("BasePart") and part.Position
                    if p and (p - myPos).Magnitude < radius then
                        pcall(function() fireclickdetector(obj) end)
                        count += 1
                    end
                end
                if obj:IsA("Tool") and obj.Parent == workspace then
                    local h = obj:FindFirstChild("Handle")
                    if h and (h.Position - myPos).Magnitude < radius then
                        pcall(function() obj.Parent = L_Plr.Backpack end)
                        count += 1
                    end
                end
            end
            LootStatus.Text = "  Looteado: " .. count .. " item(s)"
            task.wait(2.5)
            LootStatus.Text = ""
        end)
    end)
end)

-- ════════════════════════════════════════
--  👥 JUGADORES + TELEPORT
-- ════════════════════════════════════════
local Sep = Instance.new("Frame", Content)
Sep.Size = UDim2.new(1, 0, 0, 1)
Sep.BackgroundColor3 = Color3.fromRGB(30, 30, 45)
Sep.BorderSizePixel = 0

local PlrHeader = Instance.new("TextLabel", Content)
PlrHeader.Size = UDim2.new(1, 0, 0, 20)
PlrHeader.BackgroundTransparency = 1
PlrHeader.Text = "  👥 JUGADORES EN EL SERVER"
PlrHeader.TextColor3 = Color3.fromRGB(212, 175, 55)
PlrHeader.Font = Enum.Font.GothamBold
PlrHeader.TextSize = 12
PlrHeader.TextXAlignment = Enum.TextXAlignment.Left

local PlrScroll = Instance.new("ScrollingFrame", Content)
PlrScroll.Size = UDim2.new(1, 0, 0, 180)
PlrScroll.BackgroundColor3 = Color3.fromRGB(16, 16, 24)
PlrScroll.BorderSizePixel = 0
PlrScroll.ScrollBarThickness = 3
PlrScroll.AutomaticCanvasSize = Enum.AutomaticSize.Y
PlrScroll.CanvasSize = UDim2.new(0,0,0,0)
Instance.new("UICorner", PlrScroll).CornerRadius = UDim.new(0, 7)
local PlrLayout = Instance.new("UIListLayout", PlrScroll)
PlrLayout.Padding = UDim.new(0, 4)
local PlrPad = Instance.new("UIPadding", PlrScroll)
PlrPad.PaddingLeft = UDim.new(0, 5)
PlrPad.PaddingRight = UDim.new(0, 5)
PlrPad.PaddingTop = UDim.new(0, 5)
PlrPad.PaddingBottom = UDim.new(0, 5)

local function BuildList()
    for _, c in pairs(PlrScroll:GetChildren()) do
        if c:IsA("Frame") then c:Destroy() end
    end
    local list = Players:GetPlayers()
    if #list <= 1 then
        local empty = Instance.new("TextLabel", PlrScroll)
        empty.Size = UDim2.new(1, 0, 0, 28)
        empty.BackgroundTransparency = 1
        empty.Text = "No hay otros jugadores"
        empty.TextColor3 = Color3.fromRGB(55, 55, 55)
        empty.Font = Enum.Font.Gotham
        empty.TextSize = 11
        return
    end
    for _, plr in pairs(list) do
        if plr ~= L_Plr then
            local row = Instance.new("Frame", PlrScroll)
            row.Size = UDim2.new(1, 0, 0, 36)
            row.BackgroundColor3 = Color3.fromRGB(22, 22, 34)
            row.BorderSizePixel = 0
            row.Name = plr.Name
            Instance.new("UICorner", row).CornerRadius = UDim.new(0, 6)

            local nameL = Instance.new("TextLabel", row)
            nameL.Size = UDim2.new(1, -68, 1, 0)
            nameL.Position = UDim2.new(0, 10, 0, 0)
            nameL.BackgroundTransparency = 1
            nameL.Text = plr.Name
            nameL.TextColor3 = Color3.new(1, 1, 1)
            nameL.Font = Enum.Font.Gotham
            nameL.TextSize = 12
            nameL.TextXAlignment = Enum.TextXAlignment.Left

            local tpBtn = Instance.new("TextButton", row)
            tpBtn.Size = UDim2.new(0, 56, 0, 26)
            tpBtn.Position = UDim2.new(1, -60, 0.5, -13)
            tpBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
            tpBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
            tpBtn.Text = "TP"
            tpBtn.Font = Enum.Font.GothamBold
            tpBtn.TextSize = 12
            tpBtn.BorderSizePixel = 0
            Instance.new("UICorner", tpBtn).CornerRadius = UDim.new(0, 5)

            tpBtn.MouseButton1Click:Connect(function()
                pcall(function()
                    local myChar = L_Plr.Character
                    local myHRP = myChar and myChar:FindFirstChild("HumanoidRootPart")
                    local tChar = plr.Character
                    local tHRP = tChar and tChar:FindFirstChild("HumanoidRootPart")
                    if myHRP and tHRP then
                        myHRP.CFrame = CFrame.new(tHRP.Position + Vector3.new(0, 4, 0))
                    end
                end)
            end)
        end
    end
end

local RefreshBtn = Instance.new("TextButton", Content)
RefreshBtn.Size = UDim2.new(1, 0, 0, 28)
RefreshBtn.BackgroundColor3 = Color3.fromRGB(28, 28, 40)
RefreshBtn.TextColor3 = Color3.fromRGB(212, 175, 55)
RefreshBtn.Text = "🔄  Actualizar lista"
RefreshBtn.Font = Enum.Font.GothamBold
RefreshBtn.TextSize = 11
RefreshBtn.BorderSizePixel = 0
Instance.new("UICorner", RefreshBtn).CornerRadius = UDim.new(0, 6)
RefreshBtn.MouseButton1Click:Connect(BuildList)

Players.PlayerAdded:Connect(function() task.wait(0.5) BuildList() end)
Players.PlayerRemoving:Connect(function() task.wait(0.5) BuildList() end)

-- ════════════════════════════════════════
--  VERIFICAR KEY (server-side, 1 uso/cuenta)
-- ════════════════════════════════════════
VerBtn.MouseButton1Click:Connect(function()
    local key = InputBox.Text:gsub("%s+", ""):upper()
    if key == "" then
        KStatus.Text = "Escribe tu key primero."
        return
    end
    VerBtn.Text = "Verificando..."
    VerBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
    VerBtn.TextColor3 = Color3.new(1,1,1)
    KStatus.Text = ""

    local ok, result = pcall(function()
        local url = "https://${host}/api/validate?key=" .. HttpService:UrlEncode(key) .. "&username=" .. HttpService:UrlEncode(L_Plr.Name)
        return HttpService:GetAsync(url)
    end)

    if not ok then
        KStatus.Text = "Error de conexión. Intenta de nuevo."
        VerBtn.Text = "VERIFICAR KEY"
        VerBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
        VerBtn.TextColor3 = Color3.fromRGB(0,0,0)
        return
    end

    local data = HttpService:JSONDecode(result)
    if data and data.valid then
        KStatus.TextColor3 = Color3.fromRGB(0, 210, 80)
        KStatus.Text = "✓ Key válida — bienvenido!"
        VerBtn.Text = "✓ ACCESO CONCEDIDO"
        VerBtn.BackgroundColor3 = Color3.fromRGB(0, 180, 60)
        task.wait(1)
        KeyFrame:Destroy()
        MUser.Text = "  " .. L_Plr.Name .. " | Key: " .. key:sub(1, 12)
        BuildList()
        MainFrame.Visible = true
    else
        local reason = data and data.reason or "desconocido"
        if reason == "used" then
            KStatus.Text = "Key ya fue usada por otra cuenta."
        elseif reason == "expired" then
            KStatus.Text = "Key expirada."
        else
            KStatus.Text = "Key inválida. Contacta @jean14_17."
        end
        VerBtn.Text = "VERIFICAR KEY"
        VerBtn.BackgroundColor3 = Color3.fromRGB(212, 175, 55)
        VerBtn.TextColor3 = Color3.fromRGB(0,0,0)
    end
end)
`;

router.get("/acusado", (req, res) => {
  const host = req.headers.host || "jean-cheat-hub--sadx8992.replit.app";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "no-store");
  res.send(acusadoScript(host));
});

export default router;
