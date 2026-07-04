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

// ── /api/jios ── JEAN_IOS | Diseño iOS, key system, fly moto, autofarm
const jiosScript = (host: string) => `
-- [[ JEAN_IOS // Script Hub ]]
-- jean x jay | discord: jean14_17

local Players      = game:GetService("Players")
local L_Plr        = Players.LocalPlayer
local RunService   = game:GetService("RunService")
local HttpService  = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local Camera       = workspace.CurrentCamera
local Mouse        = L_Plr:GetMouse()

_G.Hitbox_Size   = 15
_G.Parts_Active  = { UpperTorso = false, HumanoidRootPart = false, LeftUpperArm = false, RightUpperArm = false, LeftUpperLeg = false, RightUpperLeg = false }
_G.Visuals       = { Box = true, Names = true, Dist = true, Weapon = true, HealthBar = true, Tracers = true }
_G.Combat        = { SilentAim = false, TriggerBot = false, RapidFire = false, NoRecoil = false }
_G.Misc          = { Speed_On = false, SpeedVal = 16, FullBright = false, FlyMoto = false, FlyMotoSpeed = 50 }
local DeletedObjects = {}

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEAN_IOS"
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = (gethui and gethui()) or game:GetService("CoreGui")

-- ════════ KEY SCREEN ════════
local KF = Instance.new("Frame", ScreenGui)
KF.Size = UDim2.new(0, 360, 0, 215)
KF.Position = UDim2.new(0.5, -180, 0.5, -108)
KF.BackgroundColor3 = Color3.fromRGB(10, 10, 14)
KF.BorderSizePixel = 0
Instance.new("UICorner", KF).CornerRadius = UDim.new(0, 12)
local KBar = Instance.new("Frame", KF); KBar.Size = UDim2.new(1,0,0,4); KBar.BackgroundColor3 = Color3.fromRGB(52,199,89); KBar.BorderSizePixel = 0; Instance.new("UICorner",KBar).CornerRadius = UDim.new(0,12)
local KT = Instance.new("TextLabel", KF); KT.Size = UDim2.new(1,0,0,44); KT.Position = UDim2.new(0,0,0,8); KT.BackgroundTransparency=1; KT.Text="JEAN_IOS"; KT.TextColor3=Color3.fromRGB(52,199,89); KT.Font=Enum.Font.GothamBold; KT.TextSize=26
local KS = Instance.new("TextLabel", KF); KS.Size = UDim2.new(1,0,0,18); KS.Position = UDim2.new(0,0,0,52); KS.BackgroundTransparency=1; KS.Text="Script Hub  |  jean x jay"; KS.TextColor3=Color3.fromRGB(60,60,70); KS.Font=Enum.Font.Gotham; KS.TextSize=12
local KIn = Instance.new("TextBox", KF); KIn.Size = UDim2.new(1,-30,0,42); KIn.Position = UDim2.new(0,15,0,82); KIn.PlaceholderText="JEAN-XXXX-XXXX"; KIn.Text=""; KIn.BackgroundColor3=Color3.fromRGB(18,18,26); KIn.BorderSizePixel=0; KIn.TextColor3=Color3.fromRGB(52,199,89); KIn.PlaceholderColor3=Color3.fromRGB(45,45,55); KIn.Font=Enum.Font.Code; KIn.TextSize=15; KIn.ClearTextOnFocus=false; Instance.new("UICorner",KIn).CornerRadius=UDim.new(0,8)
local KBtn = Instance.new("TextButton", KF); KBtn.Size = UDim2.new(1,-30,0,40); KBtn.Position = UDim2.new(0,15,0,136); KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89); KBtn.TextColor3=Color3.fromRGB(0,0,0); KBtn.Font=Enum.Font.GothamBold; KBtn.TextSize=14; KBtn.BorderSizePixel=0; Instance.new("UICorner",KBtn).CornerRadius=UDim.new(0,8)
local KSt = Instance.new("TextLabel", KF); KSt.Size = UDim2.new(1,0,0,22); KSt.Position = UDim2.new(0,0,0,186); KSt.BackgroundTransparency=1; KSt.Text=""; KSt.TextColor3=Color3.fromRGB(220,60,60); KSt.Font=Enum.Font.GothamBold; KSt.TextSize=12

-- ════════ MAIN HUB ════════
local MF = Instance.new("Frame", ScreenGui)
MF.Size = UDim2.new(0, 590, 0, 450)
MF.Position = UDim2.new(0.5, -295, 0.5, -225)
MF.BackgroundColor3 = Color3.fromRGB(10, 10, 14)
MF.Active = true; MF.Draggable = true; MF.Visible = false; MF.BorderSizePixel = 0
Instance.new("UICorner", MF).CornerRadius = UDim.new(0, 12)

-- Title bar
local TB = Instance.new("Frame", MF); TB.Size = UDim2.new(1,0,0,56); TB.BackgroundColor3=Color3.fromRGB(14,14,22); TB.BorderSizePixel=0; Instance.new("UICorner",TB).CornerRadius=UDim.new(0,12)
local HT = Instance.new("TextLabel", TB); HT.Size=UDim2.new(1,-50,0,28); HT.Position=UDim2.new(0,16,0,7); HT.BackgroundTransparency=1; HT.Text="JEAN_IOS // Script Hub"; HT.TextColor3=Color3.new(1,1,1); HT.Font=Enum.Font.GothamBold; HT.TextSize=16; HT.TextXAlignment=Enum.TextXAlignment.Left
local HS = Instance.new("TextLabel", TB); HS.Size=UDim2.new(1,-50,0,18); HS.Position=UDim2.new(0,16,0,33); HS.BackgroundTransparency=1; HS.Text="jean x jay"; HS.TextColor3=Color3.fromRGB(52,199,89); HS.Font=Enum.Font.Gotham; HS.TextSize=12; HS.TextXAlignment=Enum.TextXAlignment.Left
local MinB = Instance.new("TextButton", TB); MinB.Size=UDim2.new(0,26,0,26); MinB.Position=UDim2.new(1,-34,0,15); MinB.Text="−"; MinB.BackgroundColor3=Color3.fromRGB(50,50,65); MinB.TextColor3=Color3.new(1,1,1); MinB.Font=Enum.Font.GothamBold; MinB.TextSize=16; MinB.BorderSizePixel=0; Instance.new("UICorner",MinB).CornerRadius=UDim.new(0,6)

-- Mini bar
local MB = Instance.new("Frame", ScreenGui); MB.Size=UDim2.new(0,220,0,36); MB.Position=UDim2.new(0.5,-110,0,8); MB.BackgroundColor3=Color3.fromRGB(10,10,14); MB.Visible=false; MB.Active=true; MB.Draggable=true; MB.BorderSizePixel=0; Instance.new("UICorner",MB).CornerRadius=UDim.new(0,10)
local MBS = Instance.new("UIStroke",MB); MBS.Color=Color3.fromRGB(52,199,89); MBS.Thickness=1.2
local ML = Instance.new("TextLabel",MB); ML.Size=UDim2.new(1,-38,1,0); ML.Position=UDim2.new(0,12,0,0); ML.BackgroundTransparency=1; ML.Text="JEAN_IOS"; ML.TextColor3=Color3.fromRGB(52,199,89); ML.Font=Enum.Font.GothamBold; ML.TextSize=14; ML.TextXAlignment=Enum.TextXAlignment.Left
local MaxB = Instance.new("TextButton",MB); MaxB.Size=UDim2.new(0,26,0,26); MaxB.Position=UDim2.new(1,-32,0.5,-13); MaxB.Text="+"; MaxB.BackgroundColor3=Color3.fromRGB(52,199,89); MaxB.TextColor3=Color3.fromRGB(0,0,0); MaxB.Font=Enum.Font.GothamBold; MaxB.TextSize=16; MaxB.BorderSizePixel=0; Instance.new("UICorner",MaxB).CornerRadius=UDim.new(0,6)
MinB.MouseButton1Click:Connect(function() MF.Visible=false; MB.Visible=true end)
MaxB.MouseButton1Click:Connect(function() MF.Visible=true; MB.Visible=false end)

-- Sidebar
local SB = Instance.new("Frame", MF); SB.Size=UDim2.new(0,128,1,-64); SB.Position=UDim2.new(0,8,0,58); SB.BackgroundTransparency=1; SB.BorderSizePixel=0
local SBL = Instance.new("UIListLayout",SB); SBL.Padding=UDim.new(0,5)
local SBP = Instance.new("UIPadding",SB); SBP.PaddingTop=UDim.new(0,4)

-- Content
local CBG = Instance.new("Frame", MF); CBG.Size=UDim2.new(1,-148,1,-64); CBG.Position=UDim2.new(0,142,0,58); CBG.BackgroundColor3=Color3.fromRGB(14,14,22); CBG.BorderSizePixel=0; Instance.new("UICorner",CBG).CornerRadius=UDim.new(0,10)

local Tabs, TabBtns = {}, {}
local function MkTab(n)
    local sc = Instance.new("ScrollingFrame",CBG)
    sc.Size=UDim2.new(1,-8,1,-8); sc.Position=UDim2.new(0,4,0,4)
    sc.BackgroundTransparency=1; sc.BorderSizePixel=0; sc.ScrollBarThickness=3
    sc.ScrollBarImageColor3=Color3.fromRGB(52,199,89)
    sc.AutomaticCanvasSize=Enum.AutomaticSize.Y; sc.CanvasSize=UDim2.new(0,0,0,0); sc.Visible=false
    local ly = Instance.new("UIListLayout",sc); ly.Padding=UDim.new(0,6)
    local pd = Instance.new("UIPadding",sc); pd.PaddingTop=UDim.new(0,4); pd.PaddingBottom=UDim.new(0,8); pd.PaddingRight=UDim.new(0,4)
    Tabs[n]=sc; return sc
end
local CT=MkTab("Combat"); local VT=MkTab("Visuals"); local FT=MkTab("Farm"); local MT=MkTab("Misc")

local function SetTab(n)
    for k,t in pairs(Tabs) do t.Visible=(k==n) end
    for k,b in pairs(TabBtns) do
        b.BackgroundColor3 = k==n and Color3.fromRGB(52,199,89) or Color3.fromRGB(20,20,30)
        b.TextColor3 = k==n and Color3.fromRGB(0,0,0) or Color3.fromRGB(150,150,160)
    end
end
local function MkTabBtn(lbl, n)
    local b=Instance.new("TextButton",SB); b.Size=UDim2.new(1,0,0,42); b.BackgroundColor3=Color3.fromRGB(20,20,30); b.TextColor3=Color3.fromRGB(150,150,160); b.Text=lbl; b.Font=Enum.Font.GothamBold; b.TextSize=12; b.BorderSizePixel=0; Instance.new("UICorner",b).CornerRadius=UDim.new(0,8)
    b.MouseButton1Click:Connect(function() SetTab(n) end); TabBtns[n]=b
end
MkTabBtn("⚔️ Combat","Combat"); MkTabBtn("👁️ Visuals","Visuals"); MkTabBtn("🚜 Farm","Farm"); MkTabBtn("⚙️ Misc","Misc")

-- ── UI Helpers ──
local function IosRow(par, title, desc, init, cb)
    local row=Instance.new("Frame",par); row.Size=UDim2.new(1,0,0,62); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0; Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
    local tl=Instance.new("TextLabel",row); tl.Size=UDim2.new(1,-72,0,26); tl.Position=UDim2.new(0,14,0,8); tl.BackgroundTransparency=1; tl.Text=title; tl.TextColor3=Color3.new(1,1,1); tl.Font=Enum.Font.GothamBold; tl.TextSize=13; tl.TextXAlignment=Enum.TextXAlignment.Left
    local sl=Instance.new("TextLabel",row); sl.Size=UDim2.new(1,-72,0,18); sl.Position=UDim2.new(0,14,0,36); sl.BackgroundTransparency=1; sl.Text=desc; sl.TextColor3=Color3.fromRGB(85,85,100); sl.Font=Enum.Font.Gotham; sl.TextSize=11; sl.TextXAlignment=Enum.TextXAlignment.Left
    local pill=Instance.new("Frame",row); pill.Size=UDim2.new(0,46,0,28); pill.Position=UDim2.new(1,-58,0.5,-14); pill.BackgroundColor3=init and Color3.fromRGB(52,199,89) or Color3.fromRGB(48,48,62); pill.BorderSizePixel=0; Instance.new("UICorner",pill).CornerRadius=UDim.new(1,0)
    local kn=Instance.new("Frame",pill); kn.Size=UDim2.new(0,22,0,22); kn.Position=init and UDim2.new(1,-25,0.5,-11) or UDim2.new(0,3,0.5,-11); kn.BackgroundColor3=Color3.new(1,1,1); kn.BorderSizePixel=0; Instance.new("UICorner",kn).CornerRadius=UDim.new(1,0)
    local st=init or false
    local btn=Instance.new("TextButton",row); btn.Size=UDim2.new(1,0,1,0); btn.BackgroundTransparency=1; btn.Text=""
    btn.MouseButton1Click:Connect(function()
        st=not st
        TweenService:Create(pill,TweenInfo.new(0.14),{BackgroundColor3=st and Color3.fromRGB(52,199,89) or Color3.fromRGB(48,48,62)}):Play()
        TweenService:Create(kn,TweenInfo.new(0.14),{Position=st and UDim2.new(1,-25,0.5,-11) or UDim2.new(0,3,0.5,-11)}):Play()
        if cb then cb(st) end
    end)
end

local function ValRow(par, title, desc, def, cb)
    local row=Instance.new("Frame",par); row.Size=UDim2.new(1,0,0,62); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0; Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
    local tl=Instance.new("TextLabel",row); tl.Size=UDim2.new(1,-80,0,26); tl.Position=UDim2.new(0,14,0,8); tl.BackgroundTransparency=1; tl.Text=title; tl.TextColor3=Color3.new(1,1,1); tl.Font=Enum.Font.GothamBold; tl.TextSize=13; tl.TextXAlignment=Enum.TextXAlignment.Left
    local sl=Instance.new("TextLabel",row); sl.Size=UDim2.new(1,-80,0,18); sl.Position=UDim2.new(0,14,0,36); sl.BackgroundTransparency=1; sl.Text=desc; sl.TextColor3=Color3.fromRGB(85,85,100); sl.Font=Enum.Font.Gotham; sl.TextSize=11; sl.TextXAlignment=Enum.TextXAlignment.Left
    local inp=Instance.new("TextBox",row); inp.Size=UDim2.new(0,58,0,32); inp.Position=UDim2.new(1,-66,0.5,-16); inp.Text=tostring(def); inp.BackgroundColor3=Color3.fromRGB(26,26,38); inp.TextColor3=Color3.new(1,1,1); inp.Font=Enum.Font.GothamBold; inp.TextSize=14; inp.BorderSizePixel=0; Instance.new("UICorner",inp).CornerRadius=UDim.new(0,7)
    inp.FocusLost:Connect(function() local v=tonumber(inp.Text) or def; inp.Text=tostring(v); if cb then cb(v) end end)
end

local function ActBtn(par, lbl, col, cb)
    local b=Instance.new("TextButton",par); b.Size=UDim2.new(1,0,0,46); b.BackgroundColor3=col or Color3.fromRGB(52,199,89); b.TextColor3=col and Color3.new(1,1,1) or Color3.fromRGB(0,0,0); b.Text=lbl; b.Font=Enum.Font.GothamBold; b.TextSize=13; b.BorderSizePixel=0; Instance.new("UICorner",b).CornerRadius=UDim.new(0,10)
    b.MouseButton1Click:Connect(cb)
end

local function SecLbl(par, txt)
    local l=Instance.new("TextLabel",par); l.Size=UDim2.new(1,0,0,22); l.BackgroundTransparency=1; l.Text=txt; l.TextColor3=Color3.fromRGB(52,199,89); l.Font=Enum.Font.GothamBold; l.TextSize=11; l.TextXAlignment=Enum.TextXAlignment.Left
end

-- ════════ COMBAT ════════
ValRow(CT,"Tamaño Hitbox","Tamaño del hitbox",15,function(v) _G.Hitbox_Size=v end)
SecLbl(CT,"  HITBOX PARTS")
IosRow(CT,"Hitbox Torso","Hitbox en el torso",false,function(v) _G.Parts_Active.UpperTorso=v end)
IosRow(CT,"Hitbox HRP","Hitbox en HRP",false,function(v) _G.Parts_Active.HumanoidRootPart=v end)
IosRow(CT,"Brazo Izq.","Hitbox brazo izq.",false,function(v) _G.Parts_Active.LeftUpperArm=v end)
IosRow(CT,"Brazo Der.","Hitbox brazo der.",false,function(v) _G.Parts_Active.RightUpperArm=v end)
IosRow(CT,"Pierna Izq.","Hitbox pierna izq.",false,function(v) _G.Parts_Active.LeftUpperLeg=v end)
IosRow(CT,"Pierna Der.","Hitbox pierna der.",false,function(v) _G.Parts_Active.RightUpperLeg=v end)
SecLbl(CT,"  COMBAT")
IosRow(CT,"Silent Aim","Aim silencioso automático",false,function(v) _G.Combat.SilentAim=v end)
IosRow(CT,"Trigger Bot","Disparo automático al apuntar",false,function(v) _G.Combat.TriggerBot=v end)
IosRow(CT,"Rapid Fire","Aumenta cadencia de disparo",false,function(v) _G.Combat.RapidFire=v end)
IosRow(CT,"No Recoil","Elimina el retroceso",false,function(v) _G.Combat.NoRecoil=v end)

-- ════════ VISUALS ════════
SecLbl(VT,"  ESP")
IosRow(VT,"Box ESP","Caja alrededor de jugadores",true,function(v) _G.Visuals.Box=v end)
IosRow(VT,"Names","Nombre sobre jugadores",true,function(v) _G.Visuals.Names=v end)
IosRow(VT,"Distance","Distancia al jugador",true,function(v) _G.Visuals.Dist=v end)
IosRow(VT,"Weapon ESP","Arma del jugador",true,function(v) _G.Visuals.Weapon=v end)
IosRow(VT,"Health Bar","Barra de vida del jugador",true,function(v) _G.Visuals.HealthBar=v end)
IosRow(VT,"Tracers","Líneas hacia jugadores",true,function(v) _G.Visuals.Tracers=v end)

-- ════════ FARM ════════
SecLbl(FT,"  AUTO FARM")
ActBtn(FT,"🚜  AUTO FARM",Color3.fromRGB(52,199,89),function()
    pcall(function() loadstring(game:HttpGet("https://raw.githubusercontent.com/rexxymayor-ai/SCRIPTtt/refs/heads/main/script%20automs",true))() end)
end)
local fn=Instance.new("TextLabel",FT); fn.Size=UDim2.new(1,0,0,28); fn.BackgroundTransparency=1; fn.Text="Ejecuta el script de auto farm externo"; fn.TextColor3=Color3.fromRGB(65,65,80); fn.Font=Enum.Font.Gotham; fn.TextSize=11; fn.TextXAlignment=Enum.TextXAlignment.Left

-- ════════ MISC ════════
SecLbl(MT,"  MOVIMIENTO")
IosRow(MT,"Speed Hack","Aumenta tu velocidad de caminar",false,function(v) _G.Misc.Speed_On=v end)
ValRow(MT,"Velocidad","Velocidad del speed hack",16,function(v) _G.Misc.SpeedVal=v end)
IosRow(MT,"Full Bright","Ilumina todo el mapa",false,function(v) _G.Misc.FullBright=v end)
SecLbl(MT,"  FLY EN MOTO")
IosRow(MT,"Fly en Moto","Volar montado en moto (VehicleSeat)",false,function(v) _G.Misc.FlyMoto=v end)
ValRow(MT,"Vel. Moto","Velocidad de ascenso en moto",50,function(v) _G.Misc.FlyMotoSpeed=v end)
SecLbl(MT,"  HERRAMIENTAS")
ActBtn(MT,"🖱️  Click Delete Tool",Color3.fromRGB(34,160,60),function()
    local T=Instance.new("Tool"); T.Name="Click Delete"; T.RequiresHandle=false; T.Parent=L_Plr.Backpack
    T.Activated:Connect(function() if Mouse.Target then table.insert(DeletedObjects,{o=Mouse.Target,p=Mouse.Target.Parent}); Mouse.Target.Parent=nil end end)
end)
ActBtn(MT,"🔄  Reset Map",Color3.fromRGB(180,40,40),function()
    for _,v in pairs(DeletedObjects) do if v.o then v.o.Parent=v.p end end; DeletedObjects={}
end)

-- ════════ HELPERS POST-KEY (solo arrancan tras validar key) ════════
local function FindMySeat()
    -- Busca VehicleSeat en los welds del HRP del jugador (sin escanear workspace)
    local char=L_Plr.Character
    if not char then return nil end
    local hrp=char:FindFirstChild("HumanoidRootPart")
    if not hrp then return nil end
    for _,w in pairs(hrp:GetChildren()) do
        if (w:IsA("Weld") or w:IsA("Motor6D")) then
            local p0,p1=w.Part0,w.Part1
            if p0 and p0:IsA("VehicleSeat") then return p0 end
            if p1 and p1:IsA("VehicleSeat") then return p1 end
        end
    end
    return nil
end

local function StartHub()
    -- ESP — solo corre después de la key
    local function CreateESP(plr)
        local Box=Drawing.new("Square"); Box.Thickness=1; Box.Filled=false; Box.Color=Color3.fromRGB(52,199,89); Box.Visible=false
        local Nm=Drawing.new("Text"); Nm.Size=13; Nm.Center=true; Nm.Outline=true; Nm.Color=Color3.new(1,1,1); Nm.Visible=false
        local Ds=Drawing.new("Text"); Ds.Size=13; Ds.Center=true; Ds.Outline=true; Ds.Color=Color3.new(1,1,1); Ds.Visible=false
        local Wp=Drawing.new("Text"); Wp.Size=13; Wp.Center=true; Wp.Outline=true; Wp.Color=Color3.fromRGB(52,199,89); Wp.Visible=false
        local Ln=Drawing.new("Line"); Ln.Thickness=1; Ln.Color=Color3.fromRGB(52,199,89); Ln.Visible=false
        local HB=Drawing.new("Square"); HB.Thickness=1; HB.Filled=true; HB.Visible=false
        RunService.RenderStepped:Connect(function()
            if plr.Character and plr.Character:FindFirstChild("HumanoidRootPart") and plr.Character:FindFirstChild("Humanoid") and plr~=L_Plr then
                local HRP=plr.Character.HumanoidRootPart; local Hum=plr.Character.Humanoid
                local Pos,OnScr=Camera:WorldToViewportPoint(HRP.Position)
                if OnScr then
                    local S=Camera:WorldToViewportPoint(HRP.Position-Vector3.new(0,3,0)).Y-Camera:WorldToViewportPoint(HRP.Position+Vector3.new(0,2.6,0)).Y
                    local BS=Vector2.new(S/1.5,S); local BP=Vector2.new(Pos.X-BS.X/2,Pos.Y-BS.Y/2)
                    Box.Visible=_G.Visuals.Box; Box.Size=BS; Box.Position=BP
                    Nm.Visible=_G.Visuals.Names; Nm.Text=plr.Name; Nm.Position=Vector2.new(Pos.X,BP.Y-15)
                    local myH=L_Plr.Character and L_Plr.Character:FindFirstChild("HumanoidRootPart")
                    Ds.Visible=_G.Visuals.Dist; Ds.Text="["..((myH and math.floor((myH.Position-HRP.Position).Magnitude)) or 0).."m]"; Ds.Position=Vector2.new(Pos.X,BP.Y+BS.Y+5)
                    local t=plr.Character:FindFirstChildOfClass("Tool"); Wp.Visible=_G.Visuals.Weapon; Wp.Text=t and t.Name or "Hands"; Wp.Position=Vector2.new(Pos.X,BP.Y+BS.Y+18)
                    Ln.Visible=_G.Visuals.Tracers; Ln.From=Vector2.new(Camera.ViewportSize.X/2,0); Ln.To=Vector2.new(Pos.X,BP.Y)
                    HB.Visible=_G.Visuals.HealthBar; HB.Size=Vector2.new(2,(Hum.Health/Hum.MaxHealth)*BS.Y); HB.Position=Vector2.new(BP.X-5,BP.Y+(BS.Y-HB.Size.Y)); HB.Color=Color3.fromHSV(Hum.Health/Hum.MaxHealth*0.3,1,1)
                else Box.Visible=false;Nm.Visible=false;Ds.Visible=false;Wp.Visible=false;Ln.Visible=false;HB.Visible=false end
            else Box.Visible=false;Nm.Visible=false;Ds.Visible=false;Wp.Visible=false;Ln.Visible=false;HB.Visible=false end
        end)
    end
    for _,p in pairs(Players:GetPlayers()) do if p~=L_Plr then CreateESP(p) end end
    Players.PlayerAdded:Connect(CreateESP)

    -- Core loop — solo corre después de la key
    local hbTick=0
    RunService.Heartbeat:Connect(function()
        -- Speed hack
        if _G.Misc.Speed_On and L_Plr.Character and L_Plr.Character:FindFirstChild("Humanoid") then
            L_Plr.Character.Humanoid.WalkSpeed=_G.Misc.SpeedVal
        end
        -- Full bright
        if _G.Misc.FullBright then
            game:GetService("Lighting").Brightness=10
            game:GetService("Lighting").ClockTime=14
        end
        -- Hitbox (solo cada 3 frames para reducir carga)
        hbTick=hbTick+1
        if hbTick%3==0 then
            for _,p in pairs(Players:GetPlayers()) do
                if p~=L_Plr and p.Character then
                    for n,act in pairs(_G.Parts_Active) do
                        if act then
                            local part=p.Character:FindFirstChild(n)
                            if part and part:IsA("BasePart") then
                                part.Size=Vector3.new(_G.Hitbox_Size,_G.Hitbox_Size,_G.Hitbox_Size)
                                part.CanCollide=false; part.Massless=true; part.Transparency=1
                            end
                        end
                    end
                end
            end
        end
        -- Fly en moto: detecta el asiento desde el HRP (sin GetDescendants)
        if _G.Misc.FlyMoto then
            local seat=FindMySeat()
            if seat then
                local bv=seat:FindFirstChild("JXJFly")
                if not bv then
                    bv=Instance.new("BodyVelocity"); bv.Name="JXJFly"
                    bv.MaxForce=Vector3.new(0,math.huge,0); bv.P=5000; bv.Parent=seat
                end
                bv.Velocity=Vector3.new(0,_G.Misc.FlyMotoSpeed,0)
            end
        else
            -- Limpia solo cuando se desactiva (no cada frame)
            if L_Plr.Character then
                local hrp=L_Plr.Character:FindFirstChild("HumanoidRootPart")
                if hrp then
                    for _,w in pairs(hrp:GetChildren()) do
                        if w:IsA("Weld") or w:IsA("Motor6D") then
                            local s=w.Part0 or w.Part1
                            if s then local bv=s:FindFirstChild("JXJFly"); if bv then bv:Destroy() end end
                        end
                    end
                end
            end
        end
    end)
end

-- ════════ KEY VALIDATION ════════
KBtn.MouseButton1Click:Connect(function()
    local key=KIn.Text:gsub("%s+",""):upper()
    if key=="" then KSt.Text="Escribe tu key primero."; return end
    KBtn.Text="Verificando..."; KBtn.BackgroundColor3=Color3.fromRGB(50,50,65); KSt.Text=""
    local ok,res=pcall(function()
        return HttpService:GetAsync("https://${host}/api/validate?key="..HttpService:UrlEncode(key).."&username="..HttpService:UrlEncode(L_Plr.Name))
    end)
    if not ok then KSt.Text="Error de conexión."; KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89); return end
    local data=HttpService:JSONDecode(res)
    if data and data.valid then
        KSt.TextColor3=Color3.fromRGB(52,199,89); KSt.Text="✓ Acceso concedido"
        KBtn.Text="✓ OK"; task.wait(0.7); KF:Destroy()
        SetTab("Combat"); MF.Visible=true
        StartHub() -- ESP + Heartbeat arrancan AQUÍ, no antes
    else
        local r=data and data.reason or ""
        KSt.Text=r=="used" and "Key usada por otra cuenta." or r=="expired" and "Key expirada." or "Key inválida. Contacta @jean14_17."
        KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89)
    end
end)
`;

router.get("/jios", (req, res) => {
  const host = req.headers.host || "jean-cheat-hub--sadx8992.replit.app";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "no-store");
  res.send(jiosScript(host));
});

export default router;
