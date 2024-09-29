const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  addItem: (item) => ipcRenderer.invoke('db:add', item),
  findAllItems: () => ipcRenderer.invoke('db:findAll'),
  // Add more exposed methods as needed...
});
