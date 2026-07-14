import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

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
  static Color ink = palettes.first.ink;
  static Color green = palettes.first.primary;
  static Color lime = palettes.first.accent;
  static Color mint = palettes.first.surfaceTint;
  static Color wash = palettes.first.background;
  static Color line = palettes.first.line;
  static Color slate = palettes.first.slate;

  static void usePalette(int index) {
    final palette = palettes[index];
    ink = palette.ink;
    green = palette.primary;
    lime = palette.accent;
    mint = palette.surfaceTint;
    wash = palette.background;
    line = palette.line;
    slate = palette.slate;
  }

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
      textTheme: TextTheme(
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
          borderSide: BorderSide(color: line),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: BorderSide(color: line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: BorderSide(color: green, width: 1.4),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 16,
        ),
        labelStyle: TextStyle(color: slate, fontWeight: FontWeight.w300),
      ),
    );
  }
}

class AppPalette {
  const AppPalette({
    required this.name,
    required this.primary,
    required this.accent,
    required this.surfaceTint,
    required this.background,
    required this.ink,
    required this.slate,
    required this.line,
  });

  final String name;
  final Color primary;
  final Color accent;
  final Color surfaceTint;
  final Color background;
  final Color ink;
  final Color slate;
  final Color line;
}

const palettes = [
  AppPalette(
    name: 'Soft Parrot',
    primary: Color(0xFF5C8A1E),
    accent: Color(0xFFF1FFD7),
    surfaceTint: Color(0xFFFAFFF2),
    background: Color(0xFFF8FAF4),
    ink: Color(0xFF1F2A18),
    slate: Color(0xFF65705B),
    line: Color(0xFFDDE7CF),
  ),
  AppPalette(
    name: 'Website Parrot',
    primary: Color(0xFF0B4F2F),
    accent: Color(0xFFD9FF42),
    surfaceTint: Color(0xFFF8FFF3),
    background: Color(0xFFFBFFF7),
    ink: Color(0xFF10231B),
    slate: Color(0xFF56685F),
    line: Color(0xFFDDECCF),
  ),
  AppPalette(
    name: 'Parrot Light',
    primary: Color(0xFF064E3B),
    accent: Color(0xFFECFCCB),
    surfaceTint: Color(0xFFF7FEE7),
    background: Color(0xFFF8FFF3),
    ink: Color(0xFF10231B),
    slate: Color(0xFF5D6B62),
    line: Color(0xFFD7E9C3),
  ),
  AppPalette(
    name: 'Parrot Fresh',
    primary: Color(0xFF047857),
    accent: Color(0xFFD9FF42),
    surfaceTint: Color(0xFFF2FFE8),
    background: Color(0xFFFAFFF5),
    ink: Color(0xFF0F241B),
    slate: Color(0xFF587065),
    line: Color(0xFFD6EBC6),
  ),
  AppPalette(
    name: 'Parrot Deep',
    primary: Color(0xFF063D25),
    accent: Color(0xFFC6EF29),
    surfaceTint: Color(0xFFEFFFF0),
    background: Color(0xFFF7FCF2),
    ink: Color(0xFF10231B),
    slate: Color(0xFF5A685F),
    line: Color(0xFFD8E8C8),
  ),
];

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

const companyPhone = '+971552232850';

class BookingRequest {
  const BookingRequest({
    required this.id,
    required this.serviceName,
    required this.price,
    required this.address,
    required this.propertyType,
    required this.day,
    required this.time,
    required this.notes,
    required this.status,
    required this.createdAt,
  });

  final String id;
  final String serviceName;
  final String price;
  final String address;
  final String propertyType;
  final String day;
  final String time;
  final String notes;
  final String status;
  final DateTime createdAt;

  BookingRequest copyWith({
    String? day,
    String? time,
    String? notes,
    String? status,
  }) {
    return BookingRequest(
      id: id,
      serviceName: serviceName,
      price: price,
      address: address,
      propertyType: propertyType,
      day: day ?? this.day,
      time: time ?? this.time,
      notes: notes ?? this.notes,
      status: status ?? this.status,
      createdAt: createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'serviceName': serviceName,
      'price': price,
      'address': address,
      'propertyType': propertyType,
      'day': day,
      'time': time,
      'notes': notes,
      'status': status,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory BookingRequest.fromJson(Map<String, dynamic> json) {
    return BookingRequest(
      id:
          json['id'] as String? ??
          'BK-${DateTime.now().millisecondsSinceEpoch}',
      serviceName: json['serviceName'] as String? ?? 'Cleaning service',
      price: json['price'] as String? ?? 'Quote',
      address: json['address'] as String? ?? '',
      propertyType: json['propertyType'] as String? ?? 'Property',
      day: json['day'] as String? ?? 'Preferred day',
      time: json['time'] as String? ?? 'Preferred time',
      notes: json['notes'] as String? ?? '',
      status: json['status'] as String? ?? 'Request sent',
      createdAt:
          DateTime.tryParse(json['createdAt'] as String? ?? '') ??
          DateTime.now(),
    );
  }

  String get whatsAppMessage {
    return [
      'Hi Just Shine Cleaning Services, I need booking confirmation.',
      'Booking ID: $id',
      'Service: $serviceName',
      'Price: $price',
      'Address: $address',
      'Property: $propertyType',
      'Timing: $day, $time',
      if (notes.isNotEmpty) 'Notes: $notes',
    ].join('\n');
  }
}

class AppMessage {
  const AppMessage({
    required this.text,
    required this.mine,
    required this.createdAt,
    this.bookingId,
  });

  final String text;
  final bool mine;
  final DateTime createdAt;
  final String? bookingId;

  Map<String, dynamic> toJson() => {
    'text': text,
    'mine': mine,
    'createdAt': createdAt.toIso8601String(),
    'bookingId': bookingId,
  };

  factory AppMessage.fromJson(Map<String, dynamic> json) {
    return AppMessage(
      text: json['text'] as String? ?? '',
      mine: json['mine'] as bool? ?? false,
      createdAt:
          DateTime.tryParse(json['createdAt'] as String? ?? '') ??
          DateTime.now(),
      bookingId: json['bookingId'] as String?,
    );
  }
}

class CustomerProfile {
  const CustomerProfile({this.name = '', this.phone = '', this.address = ''});

  final String name;
  final String phone;
  final String address;

  Map<String, dynamic> toJson() => {
    'name': name,
    'phone': phone,
    'address': address,
  };

  factory CustomerProfile.fromJson(Map<String, dynamic> json) {
    return CustomerProfile(
      name: json['name'] as String? ?? '',
      phone: json['phone'] as String? ?? '',
      address: json['address'] as String? ?? '',
    );
  }
}

Future<void> openWhatsApp(String message) async {
  final uri = Uri.parse(
    'https://wa.me/${companyPhone.replaceAll('+', '')}?text=${Uri.encodeComponent(message)}',
  );
  await launchUrl(uri, mode: LaunchMode.externalApplication);
}

Future<void> callCompany() async {
  await launchUrl(
    Uri.parse('tel:$companyPhone'),
    mode: LaunchMode.externalApplication,
  );
}

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int index = 0;
  int paletteIndex = 0;
  List<BookingRequest> bookings = [];
  List<AppMessage> messages = [];
  CustomerProfile profile = const CustomerProfile();

  static const paletteKey = 'just_shine_palette';
  static const bookingsKey = 'just_shine_bookings';
  static const messagesKey = 'just_shine_messages';
  static const profileKey = 'just_shine_profile';

  @override
  void initState() {
    super.initState();
    loadLocalState();
  }

  Future<void> loadLocalState() async {
    final prefs = await SharedPreferences.getInstance();
    final savedPalette = prefs.getInt(paletteKey) ?? 0;
    final savedBookings = prefs.getString(bookingsKey);
    final savedMessages = prefs.getString(messagesKey);
    final savedProfile = prefs.getString(profileKey);

    if (!mounted) return;
    setState(() {
      paletteIndex = savedPalette.clamp(0, palettes.length - 1);
      try {
        if (savedBookings != null) {
          final decoded = jsonDecode(savedBookings) as List<dynamic>;
          bookings = decoded
              .whereType<Map<String, dynamic>>()
              .map(BookingRequest.fromJson)
              .toList();
        }
        if (savedMessages != null) {
          final decoded = jsonDecode(savedMessages) as List<dynamic>;
          messages = decoded
              .whereType<Map<String, dynamic>>()
              .map(AppMessage.fromJson)
              .where((message) => message.text.trim().isNotEmpty)
              .toList();
        }
        if (savedProfile != null) {
          profile = CustomerProfile.fromJson(
            jsonDecode(savedProfile) as Map<String, dynamic>,
          );
        }
      } catch (_) {
        bookings = [];
        messages = [];
        profile = const CustomerProfile();
      }
    });
  }

  Future<void> saveBookings() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      bookingsKey,
      jsonEncode(bookings.map((booking) => booking.toJson()).toList()),
    );
  }

  Future<void> saveMessages() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      messagesKey,
      jsonEncode(messages.map((message) => message.toJson()).toList()),
    );
  }

  Future<void> saveProfile(CustomerProfile nextProfile) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(profileKey, jsonEncode(nextProfile.toJson()));
    setState(() => profile = nextProfile);
  }

  Future<void> changePalette(int value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(paletteKey, value);
    setState(() => paletteIndex = value);
  }

  void addBooking(BookingRequest booking) {
    setState(() {
      bookings = [booking, ...bookings];
      messages = [
        AppMessage(
          text:
              'Your ${booking.serviceName.toLowerCase()} request ${booking.id} has been received. Our team will confirm availability shortly.',
          mine: false,
          createdAt: DateTime.now(),
          bookingId: booking.id,
        ),
        ...messages,
      ];
      index = 2;
    });
    saveBookings();
    saveMessages();
  }

  void updateBooking(
    BookingRequest booking, {
    required String status,
    String? day,
    String? time,
    String? message,
  }) {
    final updated = booking.copyWith(status: status, day: day, time: time);
    setState(() {
      bookings = bookings
          .map((item) => item.id == booking.id ? updated : item)
          .toList();
      messages = [
        AppMessage(
          text:
              message ?? '${updated.serviceName} ${updated.id} is now $status.',
          mine: false,
          createdAt: DateTime.now(),
          bookingId: updated.id,
        ),
        ...messages,
      ];
    });
    saveBookings();
    saveMessages();
  }

  void addMessage(String text) {
    final trimmed = text.trim();
    if (trimmed.isEmpty) return;
    setState(() {
      messages = [
        AppMessage(text: trimmed, mine: true, createdAt: DateTime.now()),
        ...messages,
      ];
    });
    saveMessages();
  }

  @override
  Widget build(BuildContext context) {
    AppTheme.usePalette(paletteIndex);

    final pages = [
      HomeScreen(
        bookings: bookings,
        messages: messages,
        onBook: () => setState(() => index = 1),
        onOpenMessages: () => setState(() => index = 3),
      ),
      QuoteScreen(profile: profile, onBookingCreated: addBooking),
      BookingsScreen(
        bookings: bookings,
        onBook: () => setState(() => index = 1),
        onOpenChat: () => setState(() => index = 3),
        onBookingChanged: updateBooking,
      ),
      ChatScreen(messages: messages, onMessageSent: addMessage),
      ProfileScreen(
        profile: profile,
        onProfileChanged: saveProfile,
        paletteIndex: paletteIndex,
        onPaletteChanged: changePalette,
      ),
    ];

    return Theme(
      data: AppTheme.light(),
      child: Scaffold(
        body: SafeArea(child: pages[index]),
        bottomNavigationBar: NavigationBar(
          height: 74,
          selectedIndex: index,
          backgroundColor: Colors.white,
          indicatorColor: AppTheme.lime,
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
              label: 'Book',
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
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    required this.bookings,
    required this.messages,
    required this.onBook,
    required this.onOpenMessages,
    super.key,
  });

  final List<BookingRequest> bookings;
  final List<AppMessage> messages;
  final VoidCallback onBook;
  final VoidCallback onOpenMessages;

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Just Shine Cleaning Services',
      trailing: RoundIcon(
        Iconsax.notification,
        onTap: () => showNotifications(context),
      ),
      children: [
        Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            color: AppTheme.mint,
            border: Border.all(color: AppTheme.line),
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
                      label: 'Book now',
                      icon: Iconsax.document_text,
                      onTap: onBook,
                    ),
                  ),
                  const SizedBox(width: 12),
                  RoundIcon(
                    Iconsax.call_calling,
                    filled: true,
                    onTap: callCompany,
                  ),
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

  void showNotifications(BuildContext context) {
    final items = [
      if (bookings.isEmpty && messages.isEmpty)
        const NoticeItem(
          icon: Iconsax.notification,
          title: 'No updates yet',
          body: 'Booking and support updates will appear here.',
        ),
      ...bookings
          .take(3)
          .map(
            (booking) => NoticeItem(
              icon: Iconsax.calendar_tick,
              title: '${booking.serviceName} request',
              body: '${booking.status} - ${booking.day}, ${booking.time}',
            ),
          ),
      ...messages
          .take(3)
          .map(
            (message) => NoticeItem(
              icon: Iconsax.message,
              title: message.mine ? 'Message sent' : 'Support update',
              body: message.text,
            ),
          ),
    ];

    showModalBottomSheet<void>(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 14, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 42,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.line,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  'Notifications',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 12),
                ...items,
                const SizedBox(height: 10),
                PrimaryButton(
                  label: 'Open messages',
                  icon: Iconsax.message,
                  onTap: () {
                    Navigator.of(context).pop();
                    onOpenMessages();
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class QuoteScreen extends StatefulWidget {
  const QuoteScreen({
    required this.profile,
    required this.onBookingCreated,
    super.key,
  });

  final CustomerProfile profile;
  final ValueChanged<BookingRequest> onBookingCreated;

  @override
  State<QuoteScreen> createState() => _QuoteScreenState();
}

class _QuoteScreenState extends State<QuoteScreen> {
  int selected = 0;
  int step = 0;
  String propertyType = 'Apartment';
  String selectedDay = 'Tomorrow';
  String selectedTime = 'Morning';
  final addressController = TextEditingController();
  final notesController = TextEditingController();

  static const totalSteps = 4;
  static const propertyTypes = ['Apartment', 'Villa', 'Office', 'Restaurant'];
  static const dayOptions = ['Today', 'Tomorrow', 'This week'];
  static const timeOptions = ['Morning', 'Afternoon', 'Evening'];

  @override
  void initState() {
    super.initState();
    if (widget.profile.address.isNotEmpty) {
      addressController.text = widget.profile.address;
    }
  }

  @override
  void dispose() {
    addressController.dispose();
    notesController.dispose();
    super.dispose();
  }

  void nextStep() {
    if (!validateStep()) return;
    if (step < totalSteps - 1) {
      setState(() => step += 1);
      return;
    }

    final booking = BookingRequest(
      id: 'JS-${DateTime.now().millisecondsSinceEpoch.toString().substring(5)}',
      serviceName: services[selected].name,
      price: services[selected].price,
      address: addressController.text.trim(),
      propertyType: propertyType,
      day: selectedDay,
      time: selectedTime,
      notes: notesController.text.trim(),
      status: 'Request sent',
      createdAt: DateTime.now(),
    );

    widget.onBookingCreated(booking);

    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.white,
        title: const Text('Booking request sent'),
        content: Text(
          '${booking.id} is saved in your bookings. You can also send the details on WhatsApp for faster confirmation.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('View bookings'),
          ),
          TextButton(
            onPressed: () => openWhatsApp(booking.whatsAppMessage),
            child: const Text('WhatsApp'),
          ),
        ],
      ),
    );
  }

  bool validateStep() {
    if (step == 1 && addressController.text.trim().length < 4) {
      showMessage('Please add your address or area.');
      return false;
    }
    return true;
  }

  void showMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.green,
      ),
    );
  }

  Widget currentStep(BuildContext context) {
    switch (step) {
      case 0:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Choose your cleaning service',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Pick the main service. You can add notes or photos later.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            ...List.generate(services.length, (i) {
              return SelectableServiceCard(
                service: services[i],
                selected: selected == i,
                onTap: () => setState(() => selected = i),
              );
            }),
          ],
        );
      case 1:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Where should we come?',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Add a clear area, building, villa number, or landmark.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            TextField(
              controller: addressController,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(
                labelText: 'Address or area',
                hintText: 'Al Danah, Al Reem, Khalifa City...',
                prefixIcon: Icon(Iconsax.location),
              ),
            ),
            const SizedBox(height: 14),
            Text(
              'Property type',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: propertyTypes.map((type) {
                return BookingChip(
                  label: type,
                  selected: propertyType == type,
                  onTap: () => setState(() => propertyType = type),
                );
              }).toList(),
            ),
          ],
        );
      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Pick timing',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Choose a preferred window. The team will confirm exact availability.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 18),
            Text('Day', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: dayOptions.map((day) {
                return BookingChip(
                  label: day,
                  selected: selectedDay == day,
                  onTap: () => setState(() => selectedDay = day),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),
            Text('Time', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: timeOptions.map((time) {
                return BookingChip(
                  label: time,
                  selected: selectedTime == time,
                  onTap: () => setState(() => selectedTime = time),
                );
              }).toList(),
            ),
            const SizedBox(height: 18),
            TextField(
              controller: notesController,
              maxLines: 4,
              decoration: const InputDecoration(
                labelText: 'Notes for the team',
                hintText: 'Rooms, stains, access details, pets, parking...',
                prefixIcon: Icon(Iconsax.note_text),
              ),
            ),
          ],
        );
      default:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Review booking request',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Check your details before sending. Our team will confirm the final availability and price.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            ReviewRow(
              icon: services[selected].icon,
              label: 'Service',
              value: services[selected].name,
            ),
            ReviewRow(
              icon: Iconsax.receipt_text,
              label: 'Starting price',
              value: services[selected].price,
            ),
            ReviewRow(
              icon: Iconsax.location,
              label: 'Address',
              value: addressController.text.trim(),
            ),
            ReviewRow(
              icon: Iconsax.building,
              label: 'Property',
              value: propertyType,
            ),
            ReviewRow(
              icon: Iconsax.calendar_1,
              label: 'Timing',
              value: '$selectedDay, $selectedTime',
            ),
            if (notesController.text.trim().isNotEmpty)
              ReviewRow(
                icon: Iconsax.note_text,
                label: 'Notes',
                value: notesController.text.trim(),
              ),
          ],
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Book service',
      subtitle: 'Step ${step + 1} of $totalSteps',
      children: [
        ProgressLabel(current: step + 1, total: totalSteps),
        const SizedBox(height: 20),
        currentStep(context),
        const SizedBox(height: 16),
        QuoteSummary(service: services[selected]),
        const SizedBox(height: 18),
        Row(
          children: [
            if (step > 0) ...[
              Expanded(
                child: SecondaryButton(
                  label: 'Back',
                  icon: Iconsax.arrow_left_2,
                  onTap: () => setState(() => step -= 1),
                ),
              ),
              const SizedBox(width: 12),
            ],
            Expanded(
              flex: 2,
              child: PrimaryButton(
                label: step == totalSteps - 1 ? 'Send request' : 'Continue',
                icon: step == totalSteps - 1
                    ? Iconsax.send_2
                    : Iconsax.arrow_right_3,
                onTap: nextStep,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class BookingsScreen extends StatelessWidget {
  const BookingsScreen({
    required this.bookings,
    required this.onBook,
    required this.onOpenChat,
    required this.onBookingChanged,
    super.key,
  });

  final List<BookingRequest> bookings;
  final VoidCallback onBook;
  final VoidCallback onOpenChat;
  final void Function(
    BookingRequest booking, {
    required String status,
    String? day,
    String? time,
    String? message,
  })
  onBookingChanged;

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Bookings',
      trailing: const RoundIcon(Iconsax.refresh),
      children: bookings.isEmpty
          ? [
              EmptyState(
                icon: Iconsax.calendar_add,
                title: 'No bookings yet',
                body:
                    'Create your first cleaning booking request. It will appear here with status and next steps.',
                actionLabel: 'Book a service',
                onAction: onBook,
              ),
            ]
          : [
              ...bookings.map(
                (booking) => BookingCard(
                  booking: booking,
                  onTap: () => showBookingDetails(context, booking),
                ),
              ),
            ],
    );
  }

  void showBookingDetails(BuildContext context, BookingRequest booking) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 14, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 42,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.line,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  booking.serviceName,
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 6),
                Text(
                  '${booking.id} - ${booking.status}',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                const SizedBox(height: 18),
                ReviewRow(
                  icon: Iconsax.receipt_text,
                  label: 'Starting price',
                  value: booking.price,
                ),
                ReviewRow(
                  icon: Iconsax.location,
                  label: 'Address',
                  value: booking.address,
                ),
                ReviewRow(
                  icon: Iconsax.calendar_1,
                  label: 'Timing',
                  value: '${booking.day}, ${booking.time}',
                ),
                if (booking.notes.isNotEmpty)
                  ReviewRow(
                    icon: Iconsax.note_text,
                    label: 'Notes',
                    value: booking.notes,
                  ),
                const SizedBox(height: 10),
                BookingTimeline(status: booking.status),
                const SizedBox(height: 18),
                if (booking.status != 'Cancelled') ...[
                  Row(
                    children: [
                      Expanded(
                        child: SecondaryButton(
                          label: 'Reschedule',
                          icon: Iconsax.calendar_edit,
                          onTap: () {
                            Navigator.of(context).pop();
                            showRescheduleSheet(context, booking);
                          },
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: SecondaryButton(
                          label: 'Cancel',
                          icon: Iconsax.close_circle,
                          onTap: () {
                            Navigator.of(context).pop();
                            confirmCancel(context, booking);
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                ],
                Row(
                  children: [
                    Expanded(
                      child: SecondaryButton(
                        label: 'Call',
                        icon: Iconsax.call_calling,
                        onTap: callCompany,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: PrimaryButton(
                        label: 'Support',
                        icon: Iconsax.message,
                        onTap: () {
                          Navigator.of(context).pop();
                          onOpenChat();
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void showRescheduleSheet(BuildContext context, BookingRequest booking) {
    var nextDay = booking.day;
    var nextTime = booking.time;

    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            return SafeArea(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 14, 20, 24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Container(
                        width: 42,
                        height: 4,
                        decoration: BoxDecoration(
                          color: AppTheme.line,
                          borderRadius: BorderRadius.circular(99),
                        ),
                      ),
                    ),
                    const SizedBox(height: 18),
                    Text(
                      'Reschedule booking',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Pick a new preferred window. The team will confirm availability.',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    const SizedBox(height: 18),
                    Text('Day', style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: _QuoteScreenState.dayOptions.map((day) {
                        return BookingChip(
                          label: day,
                          selected: nextDay == day,
                          onTap: () => setSheetState(() => nextDay = day),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 18),
                    Text(
                      'Time',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: _QuoteScreenState.timeOptions.map((time) {
                        return BookingChip(
                          label: time,
                          selected: nextTime == time,
                          onTap: () => setSheetState(() => nextTime = time),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 20),
                    PrimaryButton(
                      label: 'Save new timing',
                      icon: Iconsax.tick_circle,
                      onTap: () {
                        onBookingChanged(
                          booking,
                          status: 'Reschedule requested',
                          day: nextDay,
                          time: nextTime,
                          message:
                              '${booking.id} reschedule requested for $nextDay, $nextTime.',
                        );
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void confirmCancel(BuildContext context, BookingRequest booking) {
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.white,
        title: const Text('Cancel booking?'),
        content: Text(
          'This will mark ${booking.id} as cancelled on this device.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Keep booking'),
          ),
          TextButton(
            onPressed: () {
              onBookingChanged(
                booking,
                status: 'Cancelled',
                message:
                    '${booking.serviceName} ${booking.id} has been cancelled.',
              );
              Navigator.of(context).pop();
            },
            child: const Text('Cancel booking'),
          ),
        ],
      ),
    );
  }
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({
    required this.messages,
    required this.onMessageSent,
    super.key,
  });

  final List<AppMessage> messages;
  final ValueChanged<String> onMessageSent;

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final controller = TextEditingController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  void send() {
    final text = controller.text.trim();
    if (text.isEmpty) return;
    widget.onMessageSent(text);
    controller.clear();
    FocusScope.of(context).unfocus();
  }

  @override
  Widget build(BuildContext context) {
    final orderedMessages = widget.messages.reversed.toList();
    return AppScroll(
      title: 'Messages',
      children: [
        const NoticeCard(
          icon: Iconsax.message_question,
          title: 'Support replies',
          body:
              'Ask about bookings, arrival time, access notes, or service details.',
        ),
        const SizedBox(height: 14),
        if (orderedMessages.isEmpty)
          EmptyState(
            icon: Iconsax.message_text,
            title: 'No messages yet',
            body:
                'Send a support message or create a booking. Replies and booking updates will appear here.',
            actionLabel: 'WhatsApp support',
            onAction: () => openWhatsApp(
              'Hi Just Shine Cleaning Services, I need help with a booking.',
            ),
          )
        else
          ...orderedMessages.map(
            (message) => ChatBubble(text: message.text, mine: message.mine),
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
              RoundIcon(Iconsax.call_calling, onTap: callCompany),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  controller: controller,
                  minLines: 1,
                  maxLines: 4,
                  textInputAction: TextInputAction.send,
                  onSubmitted: (_) => send(),
                  decoration: InputDecoration.collapsed(
                    hintText: 'Type a message',
                  ),
                ),
              ),
              PrimaryIcon(icon: Iconsax.send_2, onTap: send),
            ],
          ),
        ),
      ],
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({
    required this.profile,
    required this.onProfileChanged,
    required this.paletteIndex,
    required this.onPaletteChanged,
    super.key,
  });

  final CustomerProfile profile;
  final ValueChanged<CustomerProfile> onProfileChanged;
  final int paletteIndex;
  final ValueChanged<int> onPaletteChanged;

  @override
  Widget build(BuildContext context) {
    return AppScroll(
      title: 'Profile',
      children: [
        Material(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          child: InkWell(
            borderRadius: BorderRadius.circular(24),
            onTap: () => showEditProfile(context),
            child: Container(
              padding: const EdgeInsets.all(18),
              decoration: surface(),
              child: Row(
                children: [
                  Container(
                    width: 68,
                    height: 68,
                    decoration: BoxDecoration(
                      color: AppTheme.mint,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(Iconsax.user, color: AppTheme.green, size: 30),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          profile.name.isEmpty
                              ? 'Customer profile'
                              : profile.name,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          profile.phone.isEmpty
                              ? 'Add name, phone, and default address.'
                              : profile.phone,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        if (profile.address.isNotEmpty) ...[
                          const SizedBox(height: 4),
                          Text(
                            profile.address,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ],
                    ),
                  ),
                  Icon(Iconsax.edit_2, color: AppTheme.green),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 14),
        PaletteSettings(
          selectedIndex: paletteIndex,
          onChanged: onPaletteChanged,
        ),
        const SizedBox(height: 14),
        SettingsTile(
          icon: Iconsax.location,
          title: 'Saved addresses',
          subtitle: 'Home, office, villa',
          onTap: () => showInfoSheet(
            context,
            icon: Iconsax.location,
            title: 'Saved address',
            body: profile.address.isEmpty
                ? 'Add your default address from the profile card. More saved addresses will be available after Firebase login is connected.'
                : profile.address,
          ),
        ),
        SettingsTile(
          icon: Iconsax.notification,
          title: 'Notifications',
          subtitle: 'Booking, payment, chat alerts',
          onTap: () => showInfoSheet(
            context,
            icon: Iconsax.notification,
            title: 'Notifications',
            body:
                'Local booking and support updates are enabled. Push notifications will be enabled after Firebase Cloud Messaging keys are added.',
          ),
        ),
        SettingsTile(
          icon: Iconsax.security_safe,
          title: 'Privacy',
          subtitle: 'Local data and privacy controls',
          onTap: () => showInfoSheet(
            context,
            icon: Iconsax.security_safe,
            title: 'Privacy',
            body:
                'This preview stores bookings, messages, profile, and palette only on this phone. Cloud sync starts after Firebase setup.',
          ),
        ),
      ],
    );
  }

  void showInfoSheet(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String body,
  }) {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 14, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 42,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.line,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                IconBox(icon: icon, filled: true),
                const SizedBox(height: 14),
                Text(title, style: Theme.of(context).textTheme.headlineMedium),
                const SizedBox(height: 10),
                Text(body, style: Theme.of(context).textTheme.bodyLarge),
                const SizedBox(height: 18),
                PrimaryButton(
                  label: 'Done',
                  icon: Iconsax.tick_circle,
                  onTap: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void showEditProfile(BuildContext context) {
    final nameController = TextEditingController(text: profile.name);
    final phoneController = TextEditingController(text: profile.phone);
    final addressController = TextEditingController(text: profile.address);

    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(
              20,
              14,
              20,
              MediaQuery.viewInsetsOf(context).bottom + 24,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 42,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.line,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  'Edit profile',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(
                    labelText: 'Name',
                    prefixIcon: Icon(Iconsax.user),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Phone',
                    prefixIcon: Icon(Iconsax.call),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: addressController,
                  decoration: const InputDecoration(
                    labelText: 'Default address',
                    prefixIcon: Icon(Iconsax.location),
                  ),
                ),
                const SizedBox(height: 18),
                PrimaryButton(
                  label: 'Save profile',
                  icon: Iconsax.tick_circle,
                  onTap: () {
                    onProfileChanged(
                      CustomerProfile(
                        name: nameController.text.trim(),
                        phone: phoneController.text.trim(),
                        address: addressController.text.trim(),
                      ),
                    );
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          ),
        );
      },
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
            style: TextStyle(
              color: AppTheme.green,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}

class SelectableServiceCard extends StatelessWidget {
  const SelectableServiceCard({
    required this.service,
    required this.selected,
    required this.onTap,
    super.key,
  });

  final CleaningService service;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Material(
        color: selected ? AppTheme.mint : Colors.white,
        borderRadius: BorderRadius.circular(24),
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              border: Border.all(
                color: selected ? AppTheme.green : AppTheme.line,
                width: selected ? 1.4 : 1,
              ),
            ),
            child: Row(
              children: [
                IconBox(icon: service.icon, filled: selected),
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
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      service.price,
                      style: TextStyle(
                        color: AppTheme.green,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Icon(
                      selected ? Iconsax.tick_circle : Iconsax.arrow_right_3,
                      color: selected ? AppTheme.green : AppTheme.slate,
                      size: 20,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
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
                  '${service.name} - ${service.price}',
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

class ReviewRow extends StatelessWidget {
  const ReviewRow({
    required this.icon,
    required this.label,
    required this.value,
    super.key,
  });

  final IconData icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: surface(color: AppTheme.mint),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppTheme.green, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: Theme.of(context).textTheme.bodyMedium),
                const SizedBox(height: 2),
                Text(value, style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class BookingCard extends StatelessWidget {
  const BookingCard({required this.booking, required this.onTap, super.key});

  final BookingRequest booking;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final muted = booking.status == 'Cancelled';
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: onTap,
          child: Container(
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
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            booking.serviceName,
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 2),
                          Text(
                            booking.id,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ),
                    Pill(booking.status),
                  ],
                ),
                const SizedBox(height: 14),
                Text(
                  booking.address,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: muted ? AppTheme.slate : null,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  '${booking.day}, ${booking.time} - ${booking.price}',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class EmptyState extends StatelessWidget {
  const EmptyState({
    required this.icon,
    required this.title,
    required this.body,
    required this.actionLabel,
    required this.onAction,
    super.key,
  });

  final IconData icon;
  final String title;
  final String body;
  final String actionLabel;
  final VoidCallback onAction;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: surface(color: AppTheme.mint),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          IconBox(icon: icon, filled: true),
          const SizedBox(height: 16),
          Text(title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          Text(body, style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 18),
          PrimaryButton(
            label: actionLabel,
            icon: Iconsax.arrow_right_3,
            onTap: onAction,
          ),
        ],
      ),
    );
  }
}

class BookingTimeline extends StatelessWidget {
  const BookingTimeline({required this.status, super.key});

  final String status;

  @override
  Widget build(BuildContext context) {
    final steps = status == 'Cancelled'
        ? ['Request sent', 'Cancelled']
        : [
            'Request sent',
            if (status == 'Reschedule requested') 'Reschedule requested',
            'Team confirms',
            'Cleaner assigned',
            'Completed',
          ];
    final statusIndex = steps.indexOf(status);
    final activeIndex = statusIndex < 0 ? 0 : statusIndex;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: surface(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Booking timeline',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 12),
          ...List.generate(steps.length, (index) {
            final active = index <= activeIndex;
            return Padding(
              padding: EdgeInsets.only(
                bottom: index == steps.length - 1 ? 0 : 10,
              ),
              child: Row(
                children: [
                  Icon(
                    active ? Iconsax.tick_circle : Iconsax.record_circle,
                    size: 20,
                    color: active ? AppTheme.green : AppTheme.slate,
                  ),
                  const SizedBox(width: 10),
                  Text(
                    steps[index],
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            );
          }),
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
    this.onTap,
    super.key,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: onTap,
          child: Container(
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
                      Text(
                        title,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      Text(
                        subtitle,
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ],
                  ),
                ),
                Icon(Iconsax.arrow_right_3, size: 18, color: AppTheme.slate),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class NoticeItem extends StatelessWidget {
  const NoticeItem({
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
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: surface(color: AppTheme.mint),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppTheme.green, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 3),
                Text(
                  body,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class PaletteSettings extends StatelessWidget {
  const PaletteSettings({
    required this.selectedIndex,
    required this.onChanged,
    super.key,
  });

  final int selectedIndex;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: surface(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const IconBox(icon: Iconsax.color_swatch),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'App color palette',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    Text(
                      'Switch and compare the look',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          ...List.generate(palettes.length, (index) {
            final palette = palettes[index];
            final selected = selectedIndex == index;
            return Padding(
              padding: EdgeInsets.only(
                bottom: index == palettes.length - 1 ? 0 : 10,
              ),
              child: InkWell(
                borderRadius: BorderRadius.circular(18),
                onTap: () => onChanged(index),
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: selected ? palette.surfaceTint : Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: selected ? palette.primary : AppTheme.line,
                      width: selected ? 1.4 : 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      PaletteSwatch(palette: palette),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          palette.name,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ),
                      Icon(
                        selected ? Iconsax.tick_circle : Iconsax.arrow_right_3,
                        color: selected ? palette.primary : AppTheme.slate,
                        size: 20,
                      ),
                    ],
                  ),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}

class PaletteSwatch extends StatelessWidget {
  const PaletteSwatch({required this.palette, super.key});

  final AppPalette palette;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 58,
      height: 28,
      child: Stack(
        children: [
          Positioned(left: 0, child: SwatchDot(color: palette.primary)),
          Positioned(left: 16, child: SwatchDot(color: palette.accent)),
          Positioned(left: 32, child: SwatchDot(color: palette.surfaceTint)),
        ],
      ),
    );
  }
}

class SwatchDot extends StatelessWidget {
  const SwatchDot({required this.color, super.key});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color,
        border: Border.all(color: AppTheme.line),
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
            style: TextStyle(
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
          style: TextStyle(color: AppTheme.green, fontWeight: FontWeight.w400),
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

class SecondaryButton extends StatelessWidget {
  const SecondaryButton({
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
    return OutlinedButton.icon(
      onPressed: onTap,
      icon: Icon(icon, size: 18),
      label: Text(label),
      style: OutlinedButton.styleFrom(
        minimumSize: const Size.fromHeight(54),
        foregroundColor: AppTheme.green,
        side: BorderSide(color: AppTheme.green),
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

class BookingChip extends StatelessWidget {
  const BookingChip({
    required this.label,
    required this.selected,
    required this.onTap,
    super.key,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(99),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
        decoration: BoxDecoration(
          color: selected ? AppTheme.lime.withValues(alpha: .7) : Colors.white,
          borderRadius: BorderRadius.circular(99),
          border: Border.all(color: selected ? AppTheme.green : AppTheme.line),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? AppTheme.ink : AppTheme.slate,
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

class RoundIcon extends StatelessWidget {
  const RoundIcon(this.icon, {this.filled = false, this.onTap, super.key});

  final IconData icon;
  final bool filled;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      customBorder: const CircleBorder(),
      onTap: onTap,
      child: Container(
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
        color: filled ? AppTheme.lime : AppTheme.mint,
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
        color: AppTheme.lime,
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        text,
        style: TextStyle(
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
