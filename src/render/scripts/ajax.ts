interface AjaxProps {
  url: string;
  data?: {};
}

const ajax = ({
  url,
  data,
}: AjaxProps) => {
  const gmtRequest = new Date().getTime();
  return ipcRenderer.invoke('__ajax__', { url,
    data,
    headers: {
      gmtRequest,
    } });
};

export default ajax;
