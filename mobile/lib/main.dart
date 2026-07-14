import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';

void main() {
  runApp(const JustShineBookingApp());
}

class JustShineBookingApp extends StatelessWidget {
  const JustShineBookingApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Just Shine Booking',
      theme: AppTheme.light(),
      home: const AppShell(),
    );
  }
}

class AppTheme {
  static const ink = Color(0xFF053B2C);
  static const green = Color(0xFF075D3F);
  static const lime = Color(0xFFD9FF35);
  static const mint = Color(0xFFF3FFEC);
  static const wash = Color(0xFFFAFCF7);
  static const line = Color(0xFFDDEAD4);
  static const slate = Color(0xFF526171);

  static ThemeData light() {
    const family = 'Roboto';
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: wash,
      colorScheme: ColorScheme.fromSeed(
        seedColor: green,
        brightness: Brightness.light,
        primary: green,
        secondary: lime,
        surface: Colors.white,
      ),
      fontFamily: family,
      textTheme: const TextTheme(
        displaySmall: TextStyle(
          fontSize: 34,
          height: 1.06,
          fontWeight: FontWeight.w300,
          letterSpacing: 0,
          color: ink,
        ),
        headlineMedium: TextStyle(
          fontSize: 27,
          height: 1.12,
          fontWeight: FontWeight.w300,
          letterSpacing: 0,
          color: ink,
        ),
        titleLarge: TextStyle(
          fontSize: 20,
          height: 1.22,
          fontWeight: FontWeight.w400,
          letterSpacing: 0,
          color: ink,
        ),
        titleMedium: TextStyle(
          fontSize: 16,
          height: 1.35,
          fontWeight: FontWeight.w400,
          letterSpacing: 0,
          color: ink,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          height: 1.5,
          fontWeight: FontWeight.w300,
          letterSpacing: 0,
          color: slate,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          height: 1.45,
          fontWeight: FontWeight.w300,
          letterSpacing: 0,
          color: slate,
        ),
        labelLarge: TextStyle(
          fontSize: 15,
          height: 1.2,
          fontWeight: FontWeight.w400,
          letterSpacing: 0,
          color: ink,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: line),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: green, width: 1.4),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 16,
        ),
        labelStyle: const TextStyle(color: slate, fontWeight: FontWeight.w300),
      ),
    );
  }
}

class CleaningService {
  const CleaningService(this.name, this.price, this.detail, this.icon);

  final String name;
  final String price;
  final String detail;
  final IconData icon;
}

const services = [
  CleaningService(
    'Home Cleaning',
    'AED 30/hr',
    'Bedrooms, living rooms, kitchens, bathrooms',
    Iconsax.home_2,
  ),
  CleaningService(
    'Deep Cleaning',
    'AED 100/hr',
    'Detailed sanitation for hidden dust and stains',
    Iconsax.brush_2,
  ),
  CleaningService(
    'Villa Cleaning',
    'AED 100/hr',
    'Interiors, outdoor areas, parking, patios',
    Iconsax.house_2,
  ),
  CleaningService(
    'Office Cleaning',
    'AED 50/hr',
    'Workstations, glass, restrooms, floors',
    Iconsax.building_4,
  ),
  CleaningService(
    'Sofa Cleaning',
    'AED 80/seat',
    'Steam shampoo and stain treatment',
    Iconsax.lamp_1,
  ),
  CleaningService(
    'Carpet Cleaning',
    'AED 100/visit',
    'Steam extraction for dust and allergens',
    Iconsax.grid_5,
  ),
];

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int index = 0;

  final pages = const [
    HomeScreen(),
    QuoteScreen(),
    BookingsScreen(),
    ChatScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: pages[index]),
      bottomNavigationBar: NavigationBar(
        height: 74,
        selectedIndex: index,
        backgroundColor: Colors.white,
        indicatorColor: AppTheme.lime.withValues(alpha: .38),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        onDestinationSelected: (value) => setState(() => index = value),
        destinations: const [
          NavigationDestination(
            icon: Icon(Iconsax.home_2),
            selectedIcon: Icon(Iconsax.home_2_copy),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Iconsax.document_text),
            selectedIcon: Icon(Iconsax.document_text_copy),
            label: 'Quote',
          ),
          NavigationDestination(
            icon: Icon(Iconsax.calendar_tick),
            selectedIcon: Icon(Iconsax.calendar_tick_copy),
            label: 'Bookings',
          ),
          NavigationDestination(
            icon: Icon(Iconsax.message),
            selectedIcon: Icon(Iconsax.message_copy),
            label: 'Chat',
          ),
          NavigationDestination(
            icon: Icon(Iconsax.user),
            selectedIcon: Icon(Iconsax.user_copy),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Just Shine Cleaning Services',
      trailing: const RoundIcon(Iconsax.notification),
      children: [
        Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            gradient: const LinearGradient(
              colors: [Color(0xFFF7FFE8), Color(0xFFD9FF35), Color(0xFFC8F8D4)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Pill('Abu Dhabi cleaning team'),
              const SizedBox(height: 18),
              Text(
                'Book a cleaner without the back and forth.',
                style: Theme.of(context).textTheme.displaySmall,
              ),
              const SizedBox(height: 14),
              Text(
                'Choose a service, add your location, and confirm by WhatsApp or app notification.',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: PrimaryButton(
                      label: 'Get quote',
                      icon: Iconsax.document_text,
                      onTap: () {},
                    ),
                  ),
                  const SizedBox(width: 12),
                  const RoundIcon(Iconsax.call_calling, filled: true),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 22),
        SectionHeader(title: 'Main services', action: 'View all'),
        const SizedBox(height: 12),
        ...services.take(4).map((service) => ServiceCard(service: service)),
      ],
    );
  }
}

class QuoteScreen extends StatefulWidget {
  const QuoteScreen({super.key});

  @override
  State<QuoteScreen> createState() => _QuoteScreenState();
}

class _QuoteScreenState extends State<QuoteScreen> {
  int selected = 0;

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'New quote',
      subtitle: 'Three simple steps',
      children: [
        const ProgressLabel(current: 1, total: 3),
        const SizedBox(height: 18),
        Text(
          'What do you need cleaned?',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 14),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: List.generate(services.length, (i) {
            final active = selected == i;
            return ChoiceChip(
              selected: active,
              label: Text(services[i].name),
              avatar: Icon(
                services[i].icon,
                size: 17,
                color: active ? AppTheme.ink : AppTheme.green,
              ),
              selectedColor: AppTheme.lime,
              backgroundColor: Colors.white,
              side: const BorderSide(color: AppTheme.line),
              labelStyle: const TextStyle(
                fontWeight: FontWeight.w300,
                color: AppTheme.ink,
              ),
              onSelected: (_) => setState(() => selected = i),
            );
          }),
        ),
        const SizedBox(height: 24),
        TextField(
          decoration: const InputDecoration(
            labelText: 'Address or area',
            prefixIcon: Icon(Iconsax.location),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          decoration: const InputDecoration(
            labelText: 'Preferred date and time',
            prefixIcon: Icon(Iconsax.calendar_1),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          maxLines: 3,
          decoration: const InputDecoration(
            labelText: 'Notes for the team',
            prefixIcon: Icon(Iconsax.note_text),
          ),
        ),
        const SizedBox(height: 18),
        QuoteSummary(service: services[selected]),
        const SizedBox(height: 18),
        PrimaryButton(
          label: 'Continue booking',
          icon: Iconsax.arrow_right_3,
          onTap: () {},
        ),
      ],
    );
  }
}

class BookingsScreen extends StatelessWidget {
  const BookingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Bookings',
      trailing: const RoundIcon(Iconsax.refresh),
      children: const [
        BookingCard(
          title: 'Home Cleaning',
          status: 'Draft',
          meta: 'Al Danah, Abu Dhabi',
          time: 'Tomorrow, Morning',
        ),
        BookingCard(
          title: 'Sofa Cleaning',
          status: 'Quote sent',
          meta: '3 seats, stain treatment',
          time: 'Awaiting confirmation',
        ),
      ],
    );
  }
}

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Messages',
      children: [
        const NoticeCard(
          icon: Iconsax.message_question,
          title: 'Support replies',
          body:
              'Your booking messages will appear here. Booking details stay in the booking card, chat stays clean.',
        ),
        const SizedBox(height: 14),
        ChatBubble(text: 'Hi, I need home cleaning in Al Danah.', mine: true),
        ChatBubble(
          text: 'Sure. Please share preferred time and apartment size.',
          mine: false,
        ),
        const SizedBox(height: 18),
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppTheme.line),
          ),
          child: Row(
            children: [
              const RoundIcon(Iconsax.paperclip_2),
              const SizedBox(width: 8),
              const Expanded(
                child: TextField(
                  decoration: InputDecoration.collapsed(
                    hintText: 'Type a message',
                  ),
                ),
              ),
              PrimaryIcon(icon: Iconsax.send_2, onTap: () {}),
            ],
          ),
        ),
      ],
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Profile',
      children: [
        Container(
          padding: const EdgeInsets.all(18),
          decoration: surface(),
          child: Row(
            children: [
              Container(
                width: 68,
                height: 68,
                decoration: const BoxDecoration(
                  color: AppTheme.mint,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Iconsax.user,
                  color: AppTheme.green,
                  size: 30,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Customer profile',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Add name, photo, phone, and saved addresses.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              const Icon(Iconsax.edit_2, color: AppTheme.green),
            ],
          ),
        ),
        const SizedBox(height: 14),
        const SettingsTile(
          icon: Iconsax.location,
          title: 'Saved addresses',
          subtitle: 'Home, office, villa',
        ),
        const SettingsTile(
          icon: Iconsax.notification,
          title: 'Notifications',
          subtitle: 'Booking, payment, chat alerts',
        ),
        const SettingsTile(
          icon: Iconsax.security_safe,
          title: 'Privacy',
          subtitle: 'Download/delete data later',
        ),
      ],
    );
  }
}

class AppScroll extends StatelessWidget {
  const AppScroll({
    required this.title,
    required this.children,
    this.subtitle,
    this.trailing,
    super.key,
  });

  final String title;
  final String? subtitle;
  final Widget? trailing;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          pinned: true,
          backgroundColor: AppTheme.wash,
          surfaceTintColor: AppTheme.wash,
          elevation: 0,
          titleSpacing: 20,
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.titleLarge,
              ),
              if (subtitle != null)
                Text(subtitle!, style: Theme.of(context).textTheme.bodyMedium),
            ],
          ),
          actions: [
            if (trailing != null)
              Padding(
                padding: const EdgeInsets.only(right: 18),
                child: trailing!,
              ),
          ],
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
          sliver: SliverList.separated(
            itemCount: children.length,
            separatorBuilder: (context, index) => const SizedBox(height: 0),
            itemBuilder: (context, i) => children[i],
          ),
        ),
      ],
    );
  }
}

class ServiceCard extends StatelessWidget {
  const ServiceCard({required this.service, super.key});

  final CleaningService service;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: surface(),
      child: Row(
        children: [
          IconBox(icon: service.icon),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  service.name,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 4),
                Text(
                  service.detail,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          Text(
            service.price,
            style: const TextStyle(
              color: AppTheme.green,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}

class QuoteSummary extends StatelessWidget {
  const QuoteSummary({required this.service, super.key});

  final CleaningService service;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: surface(color: AppTheme.mint),
      child: Row(
        children: [
          IconBox(icon: Iconsax.receipt_text, filled: true),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Estimated starting price',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 4),
                Text(
                  '${service.name} · ${service.price}',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class BookingCard extends StatelessWidget {
  const BookingCard({
    required this.title,
    required this.status,
    required this.meta,
    required this.time,
    super.key,
  });

  final String title;
  final String status;
  final String meta;
  final String time;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(18),
      decoration: surface(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const IconBox(icon: Iconsax.calendar_tick),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              Pill(status),
            ],
          ),
          const SizedBox(height: 14),
          Text(meta, style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 6),
          Text(time, style: Theme.of(context).textTheme.bodyMedium),
        ],
      ),
    );
  }
}

class NoticeCard extends StatelessWidget {
  const NoticeCard({
    required this.icon,
    required this.title,
    required this.body,
    super.key,
  });

  final IconData icon;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: surface(color: AppTheme.mint),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          IconBox(icon: icon, filled: true),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 6),
                Text(body, style: Theme.of(context).textTheme.bodyMedium),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ChatBubble extends StatelessWidget {
  const ChatBubble({required this.text, required this.mine, super.key});

  final String text;
  final bool mine;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: mine ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.sizeOf(context).width * .76,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: mine ? AppTheme.green : Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: mine ? null : Border.all(color: AppTheme.line),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: mine ? Colors.white : AppTheme.slate,
            fontWeight: FontWeight.w300,
            height: 1.4,
          ),
        ),
      ),
    );
  }
}

class SettingsTile extends StatelessWidget {
  const SettingsTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    super.key,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: surface(),
      child: Row(
        children: [
          IconBox(icon: icon),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium),
                Text(subtitle, style: Theme.of(context).textTheme.bodyMedium),
              ],
            ),
          ),
          const Icon(Iconsax.arrow_right_3, size: 18, color: AppTheme.slate),
        ],
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({required this.title, this.action, super.key});

  final String title;
  final String? action;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(title, style: Theme.of(context).textTheme.titleLarge),
        ),
        if (action != null)
          Text(
            action!,
            style: const TextStyle(
              color: AppTheme.green,
              fontWeight: FontWeight.w400,
            ),
          ),
      ],
    );
  }
}

class ProgressLabel extends StatelessWidget {
  const ProgressLabel({required this.current, required this.total, super.key});

  final int current;
  final int total;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Step $current/$total',
          style: const TextStyle(
            color: AppTheme.green,
            fontWeight: FontWeight.w400,
          ),
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(99),
          child: LinearProgressIndicator(
            value: current / total,
            minHeight: 7,
            backgroundColor: AppTheme.line,
            color: AppTheme.green,
          ),
        ),
      ],
    );
  }
}

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    required this.label,
    required this.icon,
    required this.onTap,
    super.key,
  });

  final String label;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return FilledButton.icon(
      onPressed: onTap,
      icon: Icon(icon, size: 19),
      label: Text(label),
      style: FilledButton.styleFrom(
        minimumSize: const Size.fromHeight(54),
        backgroundColor: AppTheme.green,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontWeight: FontWeight.w400, fontSize: 15),
      ),
    );
  }
}

class PrimaryIcon extends StatelessWidget {
  const PrimaryIcon({required this.icon, required this.onTap, super.key});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return IconButton.filled(
      onPressed: onTap,
      icon: Icon(icon, size: 20),
      style: IconButton.styleFrom(
        backgroundColor: AppTheme.green,
        foregroundColor: Colors.white,
      ),
    );
  }
}

class RoundIcon extends StatelessWidget {
  const RoundIcon(this.icon, {this.filled = false, super.key});

  final IconData icon;
  final bool filled;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: filled ? AppTheme.green : Colors.white,
        border: filled ? null : Border.all(color: AppTheme.line),
      ),
      child: Icon(
        icon,
        color: filled ? Colors.white : AppTheme.green,
        size: 21,
      ),
    );
  }
}

class IconBox extends StatelessWidget {
  const IconBox({required this.icon, this.filled = false, super.key});

  final IconData icon;
  final bool filled;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: filled ? AppTheme.lime.withValues(alpha: .45) : AppTheme.mint,
        border: Border.all(color: AppTheme.line),
      ),
      child: Icon(icon, color: AppTheme.green, size: 22),
    );
  }
}

class Pill extends StatelessWidget {
  const Pill(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
      decoration: BoxDecoration(
        color: AppTheme.lime.withValues(alpha: .48),
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        text,
        style: const TextStyle(
          color: AppTheme.green,
          fontSize: 12,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }
}

BoxDecoration surface({Color color = Colors.white}) {
  return BoxDecoration(
    color: color,
    borderRadius: BorderRadius.circular(24),
    border: Border.all(color: AppTheme.line),
  );
}
