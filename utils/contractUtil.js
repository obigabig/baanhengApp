
import { ContractStatusValue } from '../constants';
import Colors from '../constants/Colors';

exports.getColorFromStatus = status => {
    if (status === ContractStatusValue.draft) return Colors.blueBackground;
    else if (status === ContractStatusValue.ongoing) return Colors.greenBackground;
    else if (status === ContractStatusValue.break) return Colors.redBackground;
    else if (status === ContractStatusValue.end) return Colors.grayBackground;
  
    return '';
  };