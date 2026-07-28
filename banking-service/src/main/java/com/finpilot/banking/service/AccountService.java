import com.finpilot.banking.dto.DashboardResponse;
import com.finpilot.banking.entity.User;

public interface AccountService {

    Account createAccount(Account account);

    Account getAccount(Long id);

    BigDecimal getBalance(Long id);

    DashboardResponse getDashboard(User user);
}   