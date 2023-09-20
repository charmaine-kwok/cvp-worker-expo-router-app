import { Dispatch } from "react";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import QrCode, { TypeFieldsQRCode } from "~components/qrCode/qrCode";
import { Modal } from "~components/modal/Modal";

type QRCodeModalProps = {
  setIsVisible: Dispatch<boolean>;
  isVisible: boolean;
  selectedFields: any;
};

export const QRCodeModal: React.FC<QRCodeModalProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Modal
      className="flex items-center justify-center"
      justifyContent={"center"}
      isVisible={props.isVisible}
      onBackdropPress={() => {
        props.setIsVisible(false);
      }}
    >
      <Modal.Container>
        <View
          bg-screenBG
          className="flex h-[400px] w-[80%] items-center justify-center rounded-xl"
        >
          <Modal.Header>
            <Text textColor center className="text-xl">
              {t("QR Code")}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <QrCode<TypeFieldsQRCode>
              selectedFields={props.selectedFields}
              withIcon={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity
              className="mb-4"
              onPress={() => {
                router.push("/home/BarCodeScanner");
              }}
            >
              <Text textColor className="text-base mb-4">
                {t("Scan worker's QR code")}
              </Text>
            </TouchableOpacity>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  );
};

export default QRCodeModal;
