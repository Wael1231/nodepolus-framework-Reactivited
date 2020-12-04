export enum PacketDestination {
  Server,
  Host,
  Client,
}

export enum PacketType {
  Unreliable = 0x00,
  Reliable = 0x01,
  Hello = 0x08,
  Disconnect = 0x09,
  Acknowledgement = 0x0a,
  Fragment = 0x0b,
  Ping = 0x0c,
}

export enum RootAnnouncementPacketType {
  CacheData = 0x00,
  AnnouncementData = 0x01,
  FreeWeekend = 0x02,
}

export enum RootGamePacketType {
  HostGame = 0x00,
  JoinGame = 0x01,
  StartGame = 0x02,
  RemoveGame = 0x03,
  RemovePlayer = 0x04,
  GameData = 0x05,
  GameDataTo = 0x06,
  JoinedGame = 0x07,
  EndGame = 0x08,
  GetGameListV1 = 0x09,
  AlterGameTag = 0x0a,
  KickPlayer = 0x0b,
  WaitForHost = 0x0c,
  Redirect = 0x0d,
  ReselectServer = 0x0e,
  GetGameList = 0x10,
}

export enum GameDataPacketType {
  Data = 0x01,
  RPC = 0x02,
  Spawn = 0x04,
  Despawn = 0x05,
  SceneChange = 0x06,
  Ready = 0x07,
}

export enum RPCPacketType {
  PlayAnimation = 0x00,
  CompleteTask = 0x01,
  SyncSettings = 0x02,
  SetInfected = 0x03,
  Exiled = 0x04,
  CheckName = 0x05,
  SetName = 0x06,
  CheckColor = 0x07,
  SetColor = 0x08,
  SetHat = 0x09,
  SetSkin = 0x0a,
  ReportDeadBody = 0x0b,
  MurderPlayer = 0x0c,
  SendChat = 0x0d,
  StartMeeting = 0x0e,
  SetScanner = 0x0f,
  SendChatNote = 0x10,
  SetPet = 0x11,
  SetStartCounter = 0x12,
  EnterVent = 0x13,
  ExitVent = 0x14,
  SnapTo = 0x15,
  Close = 0x16,
  VotingComplete = 0x17,
  CastVote = 0x18,
  ClearVote = 0x19,
  AddVote = 0x1a,
  CloseDoorsOfType = 0x1b,
  RepairSystem = 0x1c,
  SetTasks = 0x1d,
  UpdateGameData = 0x1e,
}
