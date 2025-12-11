interface AlertProps {
  type?: 'confirm' | 'input';
  title?: string;
  content: string;
  okText?: string | false;
  cancelText?: string | false;
}
