
-- [[ JEAN_IOS // Script Hub ]]
-- jean x jay | discord: jean14_17

local Players      = game:GetService("Players")
local L_Plr        = Players.LocalPlayer
local RunService   = game:GetService("RunService")
local HttpService  = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local UIS          = game:GetService("UserInputService")
local Camera       = workspace.CurrentCamera
local Mouse        = L_Plr:GetMouse()

_G.Hitbox_Size   = 15
_G.Parts_Active  = { UpperTorso = false, HumanoidRootPart = false, LeftUpperArm = false, RightUpperArm = false, LeftUpperLeg = false, RightUpperLeg = false }
_G.Visuals       = { Box = false, Names = false, Dist = false, Weapon = false, HealthBar = false, Tracers = false }
_G.Combat        = { SilentAim = false, TriggerBot = false, RapidFire = false, NoRecoil = false }
_G.Misc          = { Speed_On = false, SpeedVal = 16, FullBright = false, FlyMoto = false, FlyMotoSpeed = 50, FlyUp = false, FlyDown = false, FlyChar = false, FlyCharSpeed = 19, AntiRK = false }
local DeletedObjects = {}

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "JEAN_IOS"
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = (gethui and gethui()) or game:GetService("CoreGui")

-- ════════ IDIOMA / LANGUAGE ════════
local LANG="ES"
local TR={
    ["Tamaño Hitbox"]="Hitbox Size",
    ["Tamaño del hitbox"]="Size of the hitbox",
    ["Hitbox en el torso"]="Hitbox on torso",
    ["Hitbox en HRP"]="Hitbox on HRP",
    ["Brazo Izq."]="Left Arm",
    ["Hitbox brazo izq."]="Left arm hitbox",
    ["Brazo Der."]="Right Arm",
    ["Hitbox brazo der."]="Right arm hitbox",
    ["Pierna Izq."]="Left Leg",
    ["Hitbox pierna izq."]="Left leg hitbox",
    ["Pierna Der."]="Right Leg",
    ["Hitbox pierna der."]="Right leg hitbox",
    ["Aim silencioso automático"]="Automatic silent aim",
    ["Rapid Fire"]="Rapid Fire",
    ["Dispara súper rápido con el arma"]="Fires super fast with your weapon",
    ["Caja alrededor de jugadores"]="Box around players",
    ["Nombre sobre jugadores"]="Name above players",
    ["Distancia al jugador"]="Distance to player",
    ["Arma del jugador"]="Player's weapon",
    ["Barra de vida del jugador"]="Player's health bar",
    ["Líneas hacia jugadores"]="Lines to players",
    ["Ejecuta el script de auto farm externo"]="Runs the external auto farm script",
    ["  MOVIMIENTO"]="  MOVEMENT",
    ["Aumenta tu velocidad de caminar"]="Increases your walk speed",
    ["Velocidad"]="Speed",
    ["Velocidad del speed hack (máx. 23)"]="Speed hack value (max 23)",
    ["Ilumina todo el mapa"]="Lights up the whole map",
    ["  FLY EN MOTO"]="  BIKE FLY",
    ["Fly en Moto"]="Bike Fly",
    ["Volar en moto con botones subir/bajar"]="Fly on your bike with up/down buttons",
    ["Vel. Moto"]="Bike Speed",
    ["Desliza la barrita para ajustar"]="Drag the bar to adjust",
    ["  FLY PERSONAJE"]="  CHARACTER FLY",
    ["Fly Personaje"]="Character Fly",
    ["Vuela con tu personaje (▲/▼ + joystick)"]="Fly with your character (▲/▼ + joystick)",
    ["  HERRAMIENTAS"]="  TOOLS",
    ["🏍️  TP a Mi Moto"]="🏍️  TP to My Bike",
    ["✕ No encontré TU moto"]="✕ Couldn't find YOUR bike",
    ["  JUGADORES"]="  PLAYERS",
    ["⏹️  Dejar de Espectear"]="⏹️  Stop Spectating",
    ["🔄  Refrescar Lista"]="🔄  Refresh List",
    ["  LUGARES GUARDADOS"]="  SAVED PLACES",
    ["Nombre del lugar"]="Place name",
    ["💾 Guardar"]="💾 Save",
    ["✓ Listo"]="✓ Done",
    ["✕ Error"]="✕ Error",
    ["🔄  Refrescar Lugares"]="🔄  Refresh Places",
    ["  PROTECCIÓN"]="  PROTECTION",
    ["Anti RK"]="Anti RK",
    ["Al recibir daño te lleva a 'pez' 15s y regresa"]="On damage, sends you to 'pez' 15s then back",
}
local function T(s)
    if LANG=="EN" then return TR[s] or s end
    return s
end
local function ApplyLang()
    if LANG~="EN" then return end
    for _,o in pairs(ScreenGui:GetDescendants()) do
        if o:IsA("TextLabel") or o:IsA("TextButton") then
            if TR[o.Text] then o.Text=TR[o.Text] end
        elseif o:IsA("TextBox") then
            if TR[o.PlaceholderText] then o.PlaceholderText=TR[o.PlaceholderText] end
        end
    end
end

-- ════════ KEY SCREEN ════════
local KF = Instance.new("Frame", ScreenGui)
KF.Size = UDim2.new(0, 360, 0, 215)
KF.Position = UDim2.new(0.5, -180, 0.5, -108)
KF.BackgroundColor3 = Color3.fromRGB(10, 10, 14)
KF.BorderSizePixel = 0
Instance.new("UICorner", KF).CornerRadius = UDim.new(0, 12)
local KBar = Instance.new("Frame", KF); KBar.Size = UDim2.new(1,0,0,4); KBar.BackgroundColor3 = Color3.fromRGB(52,199,89); KBar.BorderSizePixel = 0; Instance.new("UICorner",KBar).CornerRadius = UDim.new(0,12)
local KT = Instance.new("TextLabel", KF); KT.Size = UDim2.new(1,0,0,44); KT.Position = UDim2.new(0,0,0,8); KT.BackgroundTransparency=1; KT.Text="JEAN_IOS"; KT.TextColor3=Color3.fromRGB(52,199,89); KT.Font=Enum.Font.GothamBold; KT.TextSize=26
local KS = Instance.new("TextLabel", KF); KS.Size = UDim2.new(1,0,0,18); KS.Position = UDim2.new(0,0,0,52); KS.BackgroundTransparency=1; KS.Text="Script Hub  |  jean14_17"; KS.TextColor3=Color3.fromRGB(60,60,70); KS.Font=Enum.Font.Gotham; KS.TextSize=12
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
local HS = Instance.new("TextLabel", TB); HS.Size=UDim2.new(1,-50,0,18); HS.Position=UDim2.new(0,16,0,33); HS.BackgroundTransparency=1; HS.Text="jean14_17"; HS.TextColor3=Color3.fromRGB(52,199,89); HS.Font=Enum.Font.Gotham; HS.TextSize=12; HS.TextXAlignment=Enum.TextXAlignment.Left
local MinB = Instance.new("TextButton", TB); MinB.Size=UDim2.new(0,26,0,26); MinB.Position=UDim2.new(1,-34,0,15); MinB.Text="−"; MinB.BackgroundColor3=Color3.fromRGB(50,50,65); MinB.TextColor3=Color3.new(1,1,1); MinB.Font=Enum.Font.GothamBold; MinB.TextSize=16; MinB.BorderSizePixel=0; Instance.new("UICorner",MinB).CornerRadius=UDim.new(0,6)

-- Mini bar
local MB = Instance.new("Frame", ScreenGui); MB.Size=UDim2.new(0,220,0,36); MB.Position=UDim2.new(0.5,-110,0,8); MB.BackgroundColor3=Color3.fromRGB(10,10,14); MB.Visible=false; MB.Active=true; MB.Draggable=true; MB.BorderSizePixel=0; Instance.new("UICorner",MB).CornerRadius=UDim.new(0,10)
local MBS = Instance.new("UIStroke",MB); MBS.Color=Color3.fromRGB(52,199,89); MBS.Thickness=1.2
local ML = Instance.new("TextLabel",MB); ML.Size=UDim2.new(1,-38,1,0); ML.Position=UDim2.new(0,12,0,0); ML.BackgroundTransparency=1; ML.Text="JEAN_IOS"; ML.TextColor3=Color3.fromRGB(52,199,89); ML.Font=Enum.Font.GothamBold; ML.TextSize=14; ML.TextXAlignment=Enum.TextXAlignment.Left
local MaxB = Instance.new("TextButton",MB); MaxB.Size=UDim2.new(0,26,0,26); MaxB.Position=UDim2.new(1,-32,0.5,-13); MaxB.Text="+"; MaxB.BackgroundColor3=Color3.fromRGB(52,199,89); MaxB.TextColor3=Color3.fromRGB(0,0,0); MaxB.Font=Enum.Font.GothamBold; MaxB.TextSize=16; MaxB.BorderSizePixel=0; Instance.new("UICorner",MaxB).CornerRadius=UDim.new(0,6)
MinB.MouseButton1Click:Connect(function() MF.Visible=false; MB.Visible=true end)
MaxB.MouseButton1Click:Connect(function() MF.Visible=true; MB.Visible=false end)

-- Sidebar
local SB = Instance.new("Frame", MF); SB.Size=UDim2.new(0,128,1,-86); SB.Position=UDim2.new(0,8,0,58); SB.BackgroundTransparency=1; SB.BorderSizePixel=0
local SBL = Instance.new("UIListLayout",SB); SBL.Padding=UDim.new(0,5)
local SBP = Instance.new("UIPadding",SB); SBP.PaddingTop=UDim.new(0,4)

-- Content
local CBG = Instance.new("Frame", MF); CBG.Size=UDim2.new(1,-148,1,-86); CBG.Position=UDim2.new(0,142,0,58); CBG.BackgroundColor3=Color3.fromRGB(14,14,22); CBG.BorderSizePixel=0; Instance.new("UICorner",CBG).CornerRadius=UDim.new(0,10)

-- Barra de tiempo de la key (abajo)
local TimeLbl = Instance.new("TextLabel", MF)
TimeLbl.Size=UDim2.new(1,-16,0,20); TimeLbl.Position=UDim2.new(0,8,1,-24)
TimeLbl.BackgroundTransparency=1; TimeLbl.Text=""
TimeLbl.TextColor3=Color3.fromRGB(52,199,89); TimeLbl.Font=Enum.Font.GothamBold; TimeLbl.TextSize=12
local function StartKeyTimer(expMs)
    task.spawn(function()
        while TimeLbl and TimeLbl.Parent do
            if not expMs then
                TimeLbl.Text=LANG=="EN" and "🔑 Key: no expiration" or "🔑 Key: sin vencimiento"
                TimeLbl.TextColor3=Color3.fromRGB(52,199,89)
            else
                local rem=math.floor(expMs/1000)-os.time()
                if rem<=0 then
                    TimeLbl.Text=LANG=="EN" and "❌ KEY EXPIRED" or "❌ KEY EXPIRADA"
                    TimeLbl.TextColor3=Color3.fromRGB(220,60,60)
                else
                    local d=math.floor(rem/86400)
                    local h=math.floor((rem%86400)/3600)
                    local m=math.floor((rem%3600)/60)
                    local s=rem%60
                    local txt
                    if d>0 then txt=d.."d "..h.."h "..m.."m "..s.."s"
                    elseif h>0 then txt=h.."h "..m.."m "..s.."s"
                    else txt=m.."m "..s.."s" end
                    TimeLbl.Text=(LANG=="EN" and "⏳ Key expires in: " or "⏳ A tu key le quedan: ")..txt
                    if rem<3600 then TimeLbl.TextColor3=Color3.fromRGB(255,170,40) else TimeLbl.TextColor3=Color3.fromRGB(52,199,89) end
                end
            end
            task.wait(1)
        end
    end)
end

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
local CT=MkTab("Combat"); local VT=MkTab("Visuals"); local FT=MkTab("Farm"); local MT=MkTab("Misc"); local TT=MkTab("Teleport")

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
MkTabBtn("⚔️ Combat","Combat"); MkTabBtn("👁️ Visuals","Visuals"); MkTabBtn("🚜 Farm","Farm"); MkTabBtn("⚙️ Misc","Misc"); MkTabBtn("🧭 Teleport","Teleport")

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

local function SliderRow(par, title, desc, minV, maxV, def, cb)
    local row=Instance.new("Frame",par); row.Size=UDim2.new(1,0,0,74); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0; Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
    local tl=Instance.new("TextLabel",row); tl.Size=UDim2.new(1,-80,0,22); tl.Position=UDim2.new(0,14,0,7); tl.BackgroundTransparency=1; tl.Text=title; tl.TextColor3=Color3.new(1,1,1); tl.Font=Enum.Font.GothamBold; tl.TextSize=13; tl.TextXAlignment=Enum.TextXAlignment.Left
    local sl=Instance.new("TextLabel",row); sl.Size=UDim2.new(1,-80,0,16); sl.Position=UDim2.new(0,14,0,26); sl.BackgroundTransparency=1; sl.Text=desc; sl.TextColor3=Color3.fromRGB(85,85,100); sl.Font=Enum.Font.Gotham; sl.TextSize=11; sl.TextXAlignment=Enum.TextXAlignment.Left
    local vl=Instance.new("TextLabel",row); vl.Size=UDim2.new(0,50,0,22); vl.Position=UDim2.new(1,-60,0,7); vl.BackgroundTransparency=1; vl.Text=tostring(def); vl.TextColor3=Color3.fromRGB(52,199,89); vl.Font=Enum.Font.GothamBold; vl.TextSize=14; vl.TextXAlignment=Enum.TextXAlignment.Right
    local track=Instance.new("Frame",row); track.Size=UDim2.new(1,-28,0,6); track.Position=UDim2.new(0,14,0,54); track.BackgroundColor3=Color3.fromRGB(40,40,54); track.BorderSizePixel=0; Instance.new("UICorner",track).CornerRadius=UDim.new(1,0)
    local fill=Instance.new("Frame",track); fill.Size=UDim2.new((def-minV)/(maxV-minV),0,1,0); fill.BackgroundColor3=Color3.fromRGB(52,199,89); fill.BorderSizePixel=0; Instance.new("UICorner",fill).CornerRadius=UDim.new(1,0)
    local knob=Instance.new("Frame",track); knob.Size=UDim2.new(0,18,0,18); knob.Position=UDim2.new((def-minV)/(maxV-minV),-9,0.5,-9); knob.BackgroundColor3=Color3.new(1,1,1); knob.BorderSizePixel=0; knob.ZIndex=2; Instance.new("UICorner",knob).CornerRadius=UDim.new(1,0)
    local hit=Instance.new("TextButton",row); hit.Size=UDim2.new(1,-20,0,34); hit.Position=UDim2.new(0,10,0,40); hit.BackgroundTransparency=1; hit.Text=""
    local dragging=false
    local function SetFromX(x)
        local rel=math.clamp((x-track.AbsolutePosition.X)/math.max(track.AbsoluteSize.X,1),0,1)
        local v=math.floor(minV+(maxV-minV)*rel+0.5)
        fill.Size=UDim2.new(rel,0,1,0); knob.Position=UDim2.new(rel,-9,0.5,-9); vl.Text=tostring(v)
        if cb then cb(v) end
    end
    hit.InputBegan:Connect(function(io)
        if io.UserInputType==Enum.UserInputType.MouseButton1 or io.UserInputType==Enum.UserInputType.Touch then
            dragging=true; SetFromX(io.Position.X)
        end
    end)
    UIS.InputChanged:Connect(function(io)
        if dragging and (io.UserInputType==Enum.UserInputType.MouseMovement or io.UserInputType==Enum.UserInputType.Touch) then
            SetFromX(io.Position.X)
        end
    end)
    UIS.InputEnded:Connect(function(io)
        if io.UserInputType==Enum.UserInputType.MouseButton1 or io.UserInputType==Enum.UserInputType.Touch then
            dragging=false
        end
    end)
end

local function ActBtn(par, lbl, col, cb)
    local b=Instance.new("TextButton",par); b.Size=UDim2.new(1,0,0,46); b.BackgroundColor3=col or Color3.fromRGB(52,199,89); b.TextColor3=col and Color3.new(1,1,1) or Color3.fromRGB(0,0,0); b.Text=lbl; b.Font=Enum.Font.GothamBold; b.TextSize=13; b.BorderSizePixel=0; Instance.new("UICorner",b).CornerRadius=UDim.new(0,10)
    b.MouseButton1Click:Connect(cb)
    return b
end

local function SecLbl(par, txt)
    local l=Instance.new("TextLabel",par); l.Size=UDim2.new(1,0,0,22); l.BackgroundTransparency=1; l.Text=txt; l.TextColor3=Color3.fromRGB(52,199,89); l.Font=Enum.Font.GothamBold; l.TextSize=11; l.TextXAlignment=Enum.TextXAlignment.Left
end

-- ════════ FLY MOTO: helpers + botones flotantes ════════
local LastFlySeat=nil
local function ClearSeatMovers(s)
    if s then
        local bv=s:FindFirstChild("JXJFly"); if bv then bv:Destroy() end
        local bg=s:FindFirstChild("JXJFlyG"); if bg then bg:Destroy() end
    end
end
local function FlyCleanup()
    local char=L_Plr.Character
    if char then
        local hum=char:FindFirstChildOfClass("Humanoid")
        if hum and hum.SeatPart then ClearSeatMovers(hum.SeatPart) end
    end
    ClearSeatMovers(LastFlySeat)
    LastFlySeat=nil
end
local function CharFlyCleanup()
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    if hrp then
        local bv=hrp:FindFirstChild("JXJCF"); if bv then bv:Destroy() end
        local bg=hrp:FindFirstChild("JXJCG"); if bg then bg:Destroy() end
        local av=hrp:FindFirstChild("JXJCAV"); if av then av:Destroy() end
    end
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if hum then
        hum.PlatformStand=false
        hum:ChangeState(Enum.HumanoidStateType.GettingUp)
    end
end
L_Plr.CharacterAdded:Connect(function()
    _G.Misc.FlyUp=false; _G.Misc.FlyDown=false
    ClearSeatMovers(LastFlySeat); LastFlySeat=nil
end)

local FlyBtns=Instance.new("Frame",ScreenGui)
FlyBtns.Size=UDim2.new(0,64,0,140); FlyBtns.Position=UDim2.new(1,-78,0.5,-70)
FlyBtns.BackgroundTransparency=1; FlyBtns.Visible=false
local function MkFlyBtn(txt,posY,onDown,onUp)
    local b=Instance.new("TextButton",FlyBtns)
    b.Size=UDim2.new(0,64,0,64); b.Position=UDim2.new(0,0,0,posY)
    b.BackgroundColor3=Color3.fromRGB(18,18,26); b.BackgroundTransparency=0.25
    b.Text=txt; b.TextColor3=Color3.fromRGB(52,199,89); b.Font=Enum.Font.GothamBold; b.TextSize=26
    b.BorderSizePixel=0; Instance.new("UICorner",b).CornerRadius=UDim.new(1,0)
    local stk=Instance.new("UIStroke",b); stk.Color=Color3.fromRGB(52,199,89); stk.Thickness=1.5; stk.Transparency=0.4
    b.MouseButton1Down:Connect(onDown)
    b.MouseButton1Up:Connect(onUp)
    b.MouseLeave:Connect(onUp)
    return b
end
MkFlyBtn("▲",0,function() _G.Misc.FlyUp=true end,function() _G.Misc.FlyUp=false end)
MkFlyBtn("▼",76,function() _G.Misc.FlyDown=true end,function() _G.Misc.FlyDown=false end)

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
IosRow(CT,"Rapid Fire","Dispara súper rápido con el arma",false,function(v) _G.Combat.RapidFire=v end)
task.spawn(function()
    while true do
        if _G.Combat.RapidFire then
            local char=L_Plr.Character
            local tool=char and char:FindFirstChildOfClass("Tool")
            if tool then pcall(function() tool:Activate() end) end
            task.wait(0.05)
        else
            task.wait(0.15)
        end
    end
end)

-- ════════ VISUALS ════════
SecLbl(VT,"  ESP")
IosRow(VT,"Box ESP","Caja alrededor de jugadores",false,function(v) _G.Visuals.Box=v end)
IosRow(VT,"Names","Nombre sobre jugadores",false,function(v) _G.Visuals.Names=v end)
IosRow(VT,"Distance","Distancia al jugador",false,function(v) _G.Visuals.Dist=v end)
IosRow(VT,"Weapon ESP","Arma del jugador",false,function(v) _G.Visuals.Weapon=v end)
IosRow(VT,"Health Bar","Barra de vida del jugador",false,function(v) _G.Visuals.HealthBar=v end)
IosRow(VT,"Tracers","Líneas hacia jugadores",false,function(v) _G.Visuals.Tracers=v end)

-- ════════ FARM ════════
SecLbl(FT,"  AUTO FARM")
ActBtn(FT,"🚜  AUTO FARM",Color3.fromRGB(52,199,89),function()
    pcall(function() loadstring(game:HttpGet("https://raw.githubusercontent.com/rexxymayor-ai/SCRIPTtt/refs/heads/main/script%20automs",true))() end)
end)
local fn=Instance.new("TextLabel",FT); fn.Size=UDim2.new(1,0,0,28); fn.BackgroundTransparency=1; fn.Text="Ejecuta el script de auto farm externo"; fn.TextColor3=Color3.fromRGB(65,65,80); fn.Font=Enum.Font.Gotham; fn.TextSize=11; fn.TextXAlignment=Enum.TextXAlignment.Left

-- ════════ MISC ════════
SecLbl(MT,"  MOVIMIENTO")
IosRow(MT,"Speed Hack","Aumenta tu velocidad de caminar",false,function(v) _G.Misc.Speed_On=v end)
ValRow(MT,"Velocidad","Velocidad del speed hack (máx. 23)",16,function(v) _G.Misc.SpeedVal=math.min(v,23) end)
IosRow(MT,"Full Bright","Ilumina todo el mapa",false,function(v) _G.Misc.FullBright=v end)
SecLbl(MT,"  FLY EN MOTO")
IosRow(MT,"Fly en Moto","Volar en moto con botones subir/bajar",false,function(v)
    _G.Misc.FlyMoto=v; FlyBtns.Visible=v or _G.Misc.FlyChar
    if not v then
        if not _G.Misc.FlyChar then _G.Misc.FlyUp=false; _G.Misc.FlyDown=false end
        FlyCleanup()
    end
end)
SliderRow(MT,"Vel. Moto","Desliza la barrita para ajustar",10,300,50,function(v) _G.Misc.FlyMotoSpeed=v end)
SecLbl(MT,"  FLY PERSONAJE")
IosRow(MT,"Fly Personaje","Vuela con tu personaje (▲/▼ + joystick)",false,function(v)
    _G.Misc.FlyChar=v; FlyBtns.Visible=v or _G.Misc.FlyMoto
    if not v then
        if not _G.Misc.FlyMoto then _G.Misc.FlyUp=false; _G.Misc.FlyDown=false end
        CharFlyCleanup()
    end
end)
SecLbl(MT,"  HERRAMIENTAS")
local MotoBtn
MotoBtn=ActBtn(MT,"🏍️  TP a Mi Moto",Color3.fromRGB(90,60,200),function()
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if not hrp or not hum then return end
    if hum.SeatPart then return end
    -- Busca SOLO tu moto (el modelo o algún valor debe llevar tu nombre)
    local lname=string.lower(L_Plr.Name)
    local ldisp=string.lower(L_Plr.DisplayName)
    local owned,ownedDist=nil,math.huge
    for _,d in pairs(workspace:GetDescendants()) do
        if d:IsA("VehicleSeat") and not d.Occupant then
            local m=d:FindFirstAncestorOfClass("Model")
            local mine=false
            if m then
                local mn=string.lower(m.Name)
                if string.find(mn,lname,1,true) or string.find(mn,ldisp,1,true) then mine=true end
                if not mine then
                    for _,c in pairs(m:GetDescendants()) do
                        if c:IsA("StringValue") or c:IsA("ObjectValue") then
                            local v=string.lower(tostring(c.Value))
                            if v==lname or v==ldisp then mine=true break end
                        end
                    end
                end
                if not mine then
                    local ow=m:GetAttribute("Owner") or m:GetAttribute("owner")
                    if ow and string.lower(tostring(ow))==lname then mine=true end
                end
            end
            if mine then
                local dist=(d.Position-hrp.Position).Magnitude
                if dist<ownedDist then owned=d; ownedDist=dist end
            end
        end
    end
    if not owned then
        -- No encontró TU moto: aviso y no hace nada
        if MotoBtn then
            local old=MotoBtn.Text
            MotoBtn.Text=T("✕ No encontré TU moto")
            MotoBtn.BackgroundColor3=Color3.fromRGB(180,40,40)
            task.wait(1.2)
            MotoBtn.Text=old
            MotoBtn.BackgroundColor3=Color3.fromRGB(90,60,200)
        end
        return
    end
    -- Teleport encima del asiento y montarse automático
    hrp.CFrame=owned.CFrame*CFrame.new(0,3,0)
    task.wait(0.15)
    pcall(function() owned:Sit(hum) end)
end)
ActBtn(MT,"🖱️  Click Delete Tool",Color3.fromRGB(34,160,60),function()
    local T=Instance.new("Tool"); T.Name="Click Delete"; T.RequiresHandle=false; T.Parent=L_Plr.Backpack
    T.Activated:Connect(function() if Mouse.Target then table.insert(DeletedObjects,{o=Mouse.Target,p=Mouse.Target.Parent}); Mouse.Target.Parent=nil end end)
end)
ActBtn(MT,"🔄  Reset Map",Color3.fromRGB(180,40,40),function()
    for _,v in pairs(DeletedObjects) do if v.o then v.o.Parent=v.p end end; DeletedObjects={}
end)

-- ════════ TAB TELEPORT: TP a jugadores + Espectear ════════
local Spectating=nil
local function StopSpectate()
    Spectating=nil
    local char=L_Plr.Character
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if hum then Camera.CameraSubject=hum end
end
local function SpectatePlayer(target)
    local tchar=target.Character
    local thum=tchar and tchar:FindFirstChildOfClass("Humanoid")
    if thum then Camera.CameraSubject=thum; Spectating=target end
end
local function TPToPlayer(target)
    local tchar=target.Character
    local thrp=tchar and tchar:FindFirstChild("HumanoidRootPart")
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if not thrp or not hrp then return false end
    -- Solo funciona montado en tu moto
    if not (hum and hum.SeatPart) then return false end
    local dest=thrp.CFrame*CFrame.new(0,0,5)
    local seat=hum.SeatPart
    local model=seat:FindFirstAncestorOfClass("Model")
    if model then
        pcall(function() model:PivotTo(dest*CFrame.new(0,3,0)) end)
    else
        seat.CFrame=dest*CFrame.new(0,3,0)
    end
    return true
end
SecLbl(TT,"  JUGADORES")
ActBtn(TT,"⏹️  Dejar de Espectear",Color3.fromRGB(180,40,40),function() StopSpectate() end)
local PlrListFrame=Instance.new("Frame",TT)
PlrListFrame.Size=UDim2.new(1,0,0,0); PlrListFrame.AutomaticSize=Enum.AutomaticSize.Y
PlrListFrame.BackgroundTransparency=1
local plLy=Instance.new("UIListLayout",PlrListFrame); plLy.Padding=UDim.new(0,6)
local function RebuildPlrList()
    for _,c in pairs(PlrListFrame:GetChildren()) do
        if c:IsA("Frame") then c:Destroy() end
    end
    for _,p in pairs(Players:GetPlayers()) do
        if p~=L_Plr then
            local row=Instance.new("Frame",PlrListFrame)
            row.Size=UDim2.new(1,0,0,52); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0
            Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
            local nm=Instance.new("TextLabel",row)
            nm.Size=UDim2.new(1,-130,1,0); nm.Position=UDim2.new(0,14,0,0); nm.BackgroundTransparency=1
            nm.Text=p.DisplayName.." (@"..p.Name..")"; nm.TextColor3=Color3.new(1,1,1)
            nm.Font=Enum.Font.GothamBold; nm.TextSize=12; nm.TextXAlignment=Enum.TextXAlignment.Left
            nm.TextTruncate=Enum.TextTruncate.AtEnd
            local tp=Instance.new("TextButton",row)
            tp.Size=UDim2.new(0,52,0,34); tp.Position=UDim2.new(1,-116,0.5,-17)
            tp.BackgroundColor3=Color3.fromRGB(52,199,89); tp.TextColor3=Color3.new(0,0,0)
            tp.Text="TP"; tp.Font=Enum.Font.GothamBold; tp.TextSize=12; tp.BorderSizePixel=0
            Instance.new("UICorner",tp).CornerRadius=UDim.new(0,8)
            tp.MouseButton1Click:Connect(function()
                if not TPToPlayer(p) then
                    -- No estás en moto: avisa en el botón
                    tp.Text="🏍️!"; tp.BackgroundColor3=Color3.fromRGB(180,40,40); tp.TextColor3=Color3.new(1,1,1)
                    task.wait(1)
                    tp.Text="TP"; tp.BackgroundColor3=Color3.fromRGB(52,199,89); tp.TextColor3=Color3.new(0,0,0)
                end
            end)
            local sp=Instance.new("TextButton",row)
            sp.Size=UDim2.new(0,52,0,34); sp.Position=UDim2.new(1,-58,0.5,-17)
            sp.BackgroundColor3=Color3.fromRGB(90,60,200); sp.TextColor3=Color3.new(1,1,1)
            sp.Text="👁️"; sp.Font=Enum.Font.GothamBold; sp.TextSize=14; sp.BorderSizePixel=0
            Instance.new("UICorner",sp).CornerRadius=UDim.new(0,8)
            sp.MouseButton1Click:Connect(function() SpectatePlayer(p) end)
        end
    end
end
ActBtn(TT,"🔄  Refrescar Lista",Color3.fromRGB(34,160,60),function() RebuildPlrList() end)
RebuildPlrList()
Players.PlayerAdded:Connect(function() task.wait(0.5) RebuildPlrList() end)
Players.PlayerRemoving:Connect(function(p)
    if Spectating==p then StopSpectate() end
    task.wait(0.5) RebuildPlrList()
end)

-- ════════ HELPERS POST-KEY (solo arrancan tras validar key) ════════
local function FindMySeat()
    -- Humanoid.SeatPart es la forma correcta de saber en qué asiento estás
    local char=L_Plr.Character
    if not char then return nil end
    local hum=char:FindFirstChildOfClass("Humanoid")
    if hum and hum.SeatPart then return hum.SeatPart end
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
            L_Plr.Character.Humanoid.WalkSpeed=math.min(_G.Misc.SpeedVal,23)
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
        -- Fly en moto: asiento via Humanoid.SeatPart + BodyVelocity/BodyGyro (sin temblor)
        if _G.Misc.FlyMoto then
            local seat=FindMySeat()
            if not seat then
                -- Se bajó de la moto: limpia fuerzas del asiento anterior
                if LastFlySeat then ClearSeatMovers(LastFlySeat); LastFlySeat=nil end
                _G.Misc.FlyUp=false; _G.Misc.FlyDown=false
            else
                if LastFlySeat and LastFlySeat~=seat then ClearSeatMovers(LastFlySeat) end
                LastFlySeat=seat
                local bv=seat:FindFirstChild("JXJFly")
                if not bv then
                    bv=Instance.new("BodyVelocity"); bv.Name="JXJFly"
                    bv.MaxForce=Vector3.new(math.huge,math.huge,math.huge)
                    bv.P=9000; bv.Parent=seat
                end
                local bg=seat:FindFirstChild("JXJFlyG")
                if not bg then
                    bg=Instance.new("BodyGyro"); bg.Name="JXJFlyG"
                    bg.MaxTorque=Vector3.new(math.huge,math.huge,math.huge)
                    bg.P=9000; bg.D=500; bg.Parent=seat
                end
                -- Mantiene la moto derecha mirando hacia la cámara (sin voltearse ni temblar)
                local camLook=Camera.CFrame.LookVector
                local flat=Vector3.new(camLook.X,0,camLook.Z)
                if flat.Magnitude>0.01 then
                    bg.CFrame=CFrame.new(seat.Position, seat.Position+flat.Unit)
                end
                -- Vertical: botones ▲/▼ · Horizontal: acelerador de la moto
                local vy=0
                if _G.Misc.FlyUp then vy=_G.Misc.FlyMotoSpeed elseif _G.Misc.FlyDown then vy=-_G.Misc.FlyMotoSpeed end
                local horiz=Vector3.new(0,0,0)
                local thr=seat:IsA("VehicleSeat") and seat.Throttle or 0
                if thr~=0 and flat.Magnitude>0.01 then
                    horiz=flat.Unit*(_G.Misc.FlyMotoSpeed*thr)
                end
                bv.Velocity=Vector3.new(horiz.X,vy,horiz.Z)
            end
        end
        -- Fly personaje: física suave (sin teleports de CFrame = menos detectable)
        if _G.Misc.FlyChar then
            local char=L_Plr.Character
            local hrp=char and char:FindFirstChild("HumanoidRootPart")
            local hum=char and char:FindFirstChildOfClass("Humanoid")
            if hrp and hum and not hum.SeatPart then
                local bv=hrp:FindFirstChild("JXJCF")
                if not bv then
                    bv=Instance.new("BodyVelocity"); bv.Name="JXJCF"
                    bv.MaxForce=Vector3.new(math.huge,math.huge,math.huge)
                    bv.P=1200; bv.Parent=hrp
                end
                -- Cuerpo blando: sin gyro y con PlatformStand el cuerpo se dobla solo y cuelga flojo
                local bg=hrp:FindFirstChild("JXJCG"); if bg then bg:Destroy() end
                hum.PlatformStand=true
                if hum:GetState()~=Enum.HumanoidStateType.Physics then
                    hum:ChangeState(Enum.HumanoidStateType.Physics)
                end
                -- Freno de giro: evita que dé vueltas en el aire pero deja el cuerpo flojo
                local av=hrp:FindFirstChild("JXJCAV")
                if not av then
                    av=Instance.new("BodyAngularVelocity"); av.Name="JXJCAV"
                    av.AngularVelocity=Vector3.new(0,0,0)
                    av.MaxTorque=Vector3.new(3000,3000,3000)
                    av.P=1200; av.Parent=hrp
                end
                local camLook=Camera.CFrame.LookVector
                local md=hum.MoveDirection
                local vy
                if _G.Misc.FlyUp then vy=_G.Misc.FlyCharSpeed
                elseif _G.Misc.FlyDown then vy=-_G.Misc.FlyCharSpeed
                elseif md.Magnitude>0.05 then
                    -- Moviéndote: sube/baja según hacia dónde mira la cámara
                    vy=camLook.Y*_G.Misc.FlyCharSpeed
                else
                    -- Al flotar: baja lentito con un vaivén suave (parece caída natural, no hover)
                    vy=-2+math.sin(tick()*1.5)*1.5
                end
                -- Suaviza el cambio de velocidad (movimiento natural, menos flags del anti-cheat)
                local target=Vector3.new(md.X*_G.Misc.FlyCharSpeed,vy,md.Z*_G.Misc.FlyCharSpeed)
                bv.Velocity=bv.Velocity:Lerp(target,0.18)
            elseif hrp then
                local bv=hrp:FindFirstChild("JXJCF"); if bv then bv:Destroy() end
                local bg=hrp:FindFirstChild("JXJCG"); if bg then bg:Destroy() end
                local av=hrp:FindFirstChild("JXJCAV"); if av then av:Destroy() end
                if hum then
                    hum.PlatformStand=false
                    hum:ChangeState(Enum.HumanoidStateType.GettingUp)
                end
            end
        end
    end)
end

-- ════════ HTTP wrapper (compatible con todos los executors) ════════
local function httpGet(url)
    -- Prueba request() nativa del executor (Synapse, KRNL, Fluxus, etc.)
    if request then
        local ok,r=pcall(request,{Url=url,Method="GET"})
        if ok and r and r.Body then return r.Body end
    end
    if syn and syn.request then
        local ok,r=pcall(syn.request,{Url=url,Method="GET"})
        if ok and r and r.Body then return r.Body end
    end
    if http and http.request then
        local ok,r=pcall(http.request,{Url=url,Method="GET"})
        if ok and r then return r.body or r.Body end
    end
    if http_request then
        local ok,r=pcall(http_request,{Url=url,Method="GET"})
        if ok and r and r.Body then return r.Body end
    end
    -- Fallback: HttpService del juego
    return HttpService:GetAsync(url,true)
end

-- ════════ ANTI RK (tab Misc) ════════
local PezPos=nil
local AntiRKBusy=false
local function GetPezPos()
    local ok,res=pcall(httpGet,"https://0dca52e0-ecd3-47d0-bd7f-efef9019f710-00-1hg69y4ptibs4.spock.replit.dev/api/locations")
    if not ok or not res then return nil end
    local ok2,data=pcall(function() return HttpService:JSONDecode(res) end)
    if not ok2 or not data or not data.locations then return nil end
    for _,loc in pairs(data.locations) do
        if string.lower(tostring(loc.name))=="pez" then
            return Vector3.new(tonumber(loc.x) or 0,tonumber(loc.y) or 0,tonumber(loc.z) or 0)
        end
    end
    return nil
end
local function AntiRKTeleport(cf)
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if not hrp then return end
    if hum and hum.SeatPart then
        local model=hum.SeatPart:FindFirstAncestorOfClass("Model")
        if model then pcall(function() model:PivotTo(cf) end)
        else pcall(function() hum.SeatPart.CFrame=cf end) end
    else
        pcall(function() hrp.CFrame=cf end)
    end
end
local AntiRKGen=0
local function DoAntiRK()
    if AntiRKBusy then return end
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    if not hrp then return end
    if not PezPos then PezPos=GetPezPos() end
    if not PezPos then return end
    AntiRKBusy=true
    AntiRKGen=AntiRKGen+1
    local myGen=AntiRKGen
    local myChar=char
    local backCF=hrp.CFrame
    AntiRKTeleport(CFrame.new(PezPos+Vector3.new(0,4,0)))
    task.delay(15,function()
        -- Solo regresa si sigues siendo el mismo personaje (no moriste/reapareciste)
        if myGen==AntiRKGen and L_Plr.Character==myChar then
            AntiRKTeleport(backCF)
        end
        if myGen==AntiRKGen then AntiRKBusy=false end
    end)
end
local AntiRKConn=nil
local function HookAntiRKHealth(char)
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if not hum then return end
    local lastHealth=hum.Health
    if AntiRKConn then AntiRKConn:Disconnect(); AntiRKConn=nil end
    AntiRKConn=hum.HealthChanged:Connect(function(h)
        if _G.Misc.AntiRK and h<lastHealth then DoAntiRK() end
        lastHealth=h
    end)
end
SecLbl(MT,T("  PROTECCIÓN"))
IosRow(MT,"Anti RK","Al recibir daño te lleva a 'pez' 15s y regresa",false,function(v)
    _G.Misc.AntiRK=v
    if v then
        PezPos=GetPezPos()
        if L_Plr.Character then HookAntiRKHealth(L_Plr.Character) end
    else
        if AntiRKConn then AntiRKConn:Disconnect(); AntiRKConn=nil end
    end
end)
L_Plr.CharacterAdded:Connect(function(char)
    -- Invalida cualquier regreso pendiente de la vida anterior
    AntiRKGen=AntiRKGen+1
    AntiRKBusy=false
    if _G.Misc.AntiRK then task.wait(1); HookAntiRKHealth(char) end
end)

-- ════════ LUGARES GUARDADOS (tab Teleport) ════════
local function TPToPos(pos)
    -- Solo funciona montado en la moto
    local char=L_Plr.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    local hum=char and char:FindFirstChildOfClass("Humanoid")
    if not hrp or not hum or not hum.SeatPart then return false end
    local dest=CFrame.new(pos+Vector3.new(0,4,0))
    local model=hum.SeatPart:FindFirstAncestorOfClass("Model")
    if model then pcall(function() model:PivotTo(dest) end)
    else hum.SeatPart.CFrame=dest end
    return true
end
local RebuildPlaces
local function SetupLugares(isAdmin,key)
    SecLbl(TT,T("  LUGARES GUARDADOS"))
    if isAdmin then
        local row=Instance.new("Frame",TT); row.Size=UDim2.new(1,0,0,52); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0; Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
        local inp=Instance.new("TextBox",row); inp.Size=UDim2.new(1,-124,0,34); inp.Position=UDim2.new(0,10,0.5,-17); inp.PlaceholderText=T("Nombre del lugar"); inp.Text=""; inp.BackgroundColor3=Color3.fromRGB(26,26,38); inp.TextColor3=Color3.new(1,1,1); inp.PlaceholderColor3=Color3.fromRGB(90,90,105); inp.Font=Enum.Font.Gotham; inp.TextSize=12; inp.BorderSizePixel=0; Instance.new("UICorner",inp).CornerRadius=UDim.new(0,7)
        local sv=Instance.new("TextButton",row); sv.Size=UDim2.new(0,100,0,34); sv.Position=UDim2.new(1,-110,0.5,-17); sv.BackgroundColor3=Color3.fromRGB(52,199,89); sv.TextColor3=Color3.new(0,0,0); sv.Text=T("💾 Guardar"); sv.Font=Enum.Font.GothamBold; sv.TextSize=12; sv.BorderSizePixel=0; Instance.new("UICorner",sv).CornerRadius=UDim.new(0,8)
        sv.MouseButton1Click:Connect(function()
            local nm=inp.Text:gsub("^%s+",""):gsub("%s+$","")
            local char=L_Plr.Character
            local hrp=char and char:FindFirstChild("HumanoidRootPart")
            if nm=="" or not hrp then return end
            local pos=hrp.Position
            sv.Text="..."
            local url="https://0dca52e0-ecd3-47d0-bd7f-efef9019f710-00-1hg69y4ptibs4.spock.replit.dev/api/locations/save?key="..HttpService:UrlEncode(key).."&name="..HttpService:UrlEncode(nm).."&x="..math.floor(pos.X+0.5).."&y="..math.floor(pos.Y+0.5).."&z="..math.floor(pos.Z+0.5).."&username="..HttpService:UrlEncode(L_Plr.Name)
            local ok=pcall(httpGet,url)
            sv.Text=ok and T("✓ Listo") or T("✕ Error")
            if ok then inp.Text="" end
            task.wait(0.9); sv.Text=T("💾 Guardar")
            if RebuildPlaces then RebuildPlaces(isAdmin,key) end
        end)
    end
    local PlacesFrame=Instance.new("Frame",TT)
    PlacesFrame.Size=UDim2.new(1,0,0,0); PlacesFrame.AutomaticSize=Enum.AutomaticSize.Y
    PlacesFrame.BackgroundTransparency=1
    local pfLy=Instance.new("UIListLayout",PlacesFrame); pfLy.Padding=UDim.new(0,6)
    RebuildPlaces=function(adm,k)
        for _,c in pairs(PlacesFrame:GetChildren()) do
            if c:IsA("Frame") then c:Destroy() end
        end
        local ok,res=pcall(httpGet,"https://0dca52e0-ecd3-47d0-bd7f-efef9019f710-00-1hg69y4ptibs4.spock.replit.dev/api/locations")
        if not ok or not res then return end
        local ok2,data=pcall(function() return HttpService:JSONDecode(res) end)
        if not ok2 or not data or not data.locations then return end
        for _,loc in pairs(data.locations) do
            local row=Instance.new("Frame",PlacesFrame)
            row.Size=UDim2.new(1,0,0,48); row.BackgroundColor3=Color3.fromRGB(18,18,26); row.BorderSizePixel=0
            Instance.new("UICorner",row).CornerRadius=UDim.new(0,10)
            local nm=Instance.new("TextLabel",row)
            nm.Size=UDim2.new(1,adm and -130 or -76,1,0); nm.Position=UDim2.new(0,14,0,0); nm.BackgroundTransparency=1
            nm.Text="📍 "..tostring(loc.name); nm.TextColor3=Color3.new(1,1,1)
            nm.Font=Enum.Font.GothamBold; nm.TextSize=12; nm.TextXAlignment=Enum.TextXAlignment.Left
            nm.TextTruncate=Enum.TextTruncate.AtEnd
            local tp=Instance.new("TextButton",row)
            tp.Size=UDim2.new(0,52,0,32); tp.Position=UDim2.new(1,adm and -116 or -62,0.5,-16)
            tp.BackgroundColor3=Color3.fromRGB(52,199,89); tp.TextColor3=Color3.new(0,0,0)
            tp.Text="TP"; tp.Font=Enum.Font.GothamBold; tp.TextSize=12; tp.BorderSizePixel=0
            Instance.new("UICorner",tp).CornerRadius=UDim.new(0,8)
            tp.MouseButton1Click:Connect(function()
                local ok=TPToPos(Vector3.new(tonumber(loc.x) or 0,tonumber(loc.y) or 0,tonumber(loc.z) or 0))
                if not ok then
                    -- No está montado en la moto: aviso rojo
                    tp.Text="🏍️!"; tp.BackgroundColor3=Color3.fromRGB(180,40,40); tp.TextColor3=Color3.new(1,1,1)
                    task.wait(1)
                    tp.Text="TP"; tp.BackgroundColor3=Color3.fromRGB(52,199,89); tp.TextColor3=Color3.new(0,0,0)
                end
            end)
            if adm then
                local del=Instance.new("TextButton",row)
                del.Size=UDim2.new(0,44,0,32); del.Position=UDim2.new(1,-56,0.5,-16)
                del.BackgroundColor3=Color3.fromRGB(180,40,40); del.TextColor3=Color3.new(1,1,1)
                del.Text="✕"; del.Font=Enum.Font.GothamBold; del.TextSize=13; del.BorderSizePixel=0
                Instance.new("UICorner",del).CornerRadius=UDim.new(0,8)
                del.MouseButton1Click:Connect(function()
                    pcall(httpGet,"https://0dca52e0-ecd3-47d0-bd7f-efef9019f710-00-1hg69y4ptibs4.spock.replit.dev/api/locations/delete?key="..HttpService:UrlEncode(k).."&id="..tostring(loc.id))
                    RebuildPlaces(adm,k)
                end)
            end
        end
    end
    ActBtn(TT,T("🔄  Refrescar Lugares"),Color3.fromRGB(34,160,60),function() RebuildPlaces(isAdmin,key) end)
    task.spawn(function() RebuildPlaces(isAdmin,key) end)
end

-- ════════ KEY VALIDATION ════════
KBtn.MouseButton1Click:Connect(function()
    local key=KIn.Text:gsub("%s+",""):upper()
    if key=="" then KSt.Text="Escribe tu key primero."; return end
    KBtn.Text="Verificando..."; KBtn.BackgroundColor3=Color3.fromRGB(50,50,65); KSt.Text=""
    local url="https://0dca52e0-ecd3-47d0-bd7f-efef9019f710-00-1hg69y4ptibs4.spock.replit.dev/api/validate?key="..HttpService:UrlEncode(key).."&username="..HttpService:UrlEncode(L_Plr.Name).."&userid="..tostring(L_Plr.UserId)
    local ok,res=pcall(httpGet,url)
    if not ok or not res then KSt.Text="Error de conexión."; KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89); return end
    local ok2,data=pcall(function() return HttpService:JSONDecode(res) end)
    if not ok2 or not data then KSt.Text="Error de conexión."; KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89); return end
    if data.valid then
        KSt.TextColor3=Color3.fromRGB(52,199,89); KSt.Text="✓ Acceso concedido"
        KBtn.Text="✓ OK"; task.wait(0.7)
        -- Pregunta de idioma / Language question
        KIn.Visible=false; KBtn.Visible=false; KSt.Visible=false
        local LQ=Instance.new("TextLabel",KF); LQ.Size=UDim2.new(1,0,0,24); LQ.Position=UDim2.new(0,0,0,80); LQ.BackgroundTransparency=1; LQ.Text="Elige tu idioma / Choose your language"; LQ.TextColor3=Color3.new(1,1,1); LQ.Font=Enum.Font.GothamBold; LQ.TextSize=13
        local function LangBtn(txt,xPos,fn)
            local b=Instance.new("TextButton",KF); b.Size=UDim2.new(0,150,0,42); b.Position=UDim2.new(0,xPos,0,120); b.Text=txt; b.BackgroundColor3=Color3.fromRGB(52,199,89); b.TextColor3=Color3.fromRGB(0,0,0); b.Font=Enum.Font.GothamBold; b.TextSize=14; b.BorderSizePixel=0; Instance.new("UICorner",b).CornerRadius=UDim.new(0,8)
            b.MouseButton1Click:Connect(fn)
        end
        local started=false
        local function StartWithLang(lang)
            if started then return end
            started=true
            LANG=lang
            ApplyLang()
            KF:Destroy()
            SetTab("Combat"); MF.Visible=true
            SetupLugares(data.admin==true,key)
            StartKeyTimer(data.expiresAt)
            StartHub()
        end
        LangBtn("🇪🇸 ESPAÑOL",25,function() StartWithLang("ES") end)
        LangBtn("🇺🇸 ENGLISH",185,function() StartWithLang("EN") end)
    else
        local r=data.reason or ""
        KSt.Text=r=="used" and "Key usada por otra cuenta." or r=="expired" and "Key expirada." or "Key inválida. Contacta @jean14_17."
        KBtn.Text="ENTRAR"; KBtn.BackgroundColor3=Color3.fromRGB(52,199,89)
    end
end)
