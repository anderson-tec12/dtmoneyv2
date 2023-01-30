import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer, HeaderContent, NewtransactionButton } from "./styles";
import LogoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewtransactionButton>Nova transação</NewtransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
